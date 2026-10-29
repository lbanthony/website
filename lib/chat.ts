import { systemPrompt } from "./profile";

export type ChatEnvironment = {
  ANTHROPIC_API_KEY?: string;
  ANTHROPIC_MODEL?: string;
};

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function handleChat(request: Request, environment: ChatEnvironment) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return json({ error: "Please ask from this website." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return json({ error: "Expected a JSON request." }, 415);
  if (Number(request.headers.get("content-length")) > 12000)
    return json({ error: "Please ask a shorter question." }, 413);
  let body: unknown;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > 12000)
      return json({ error: "Please ask a shorter question." }, 413);
    body = JSON.parse(raw);
  } catch {
    return json({ error: "The request could not be read." }, 400);
  }
  if (
    !body ||
    typeof body !== "object" ||
    !("consent" in body) ||
    body.consent !== true
  )
    return json(
      { error: "Choose the AI option before sending a question." },
      400,
    );
  if (
    !("messages" in body) ||
    !Array.isArray(body.messages) ||
    body.messages.length !== 1
  )
    return json({ error: "Please send one question." }, 400);
  const message = body.messages[0];
  if (
    !message ||
    message.role !== "user" ||
    typeof message.content !== "string" ||
    !message.content.trim() ||
    message.content.length > 600
  )
    return json(
      { error: "Please ask a question of up to 600 characters." },
      400,
    );
  const apiKey = environment.ANTHROPIC_API_KEY;
  if (!apiKey)
    return json(
      {
        error:
          "The AI option isn’t configured. The profile guide is still available.",
      },
      503,
    );
  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: environment.ANTHROPIC_MODEL || "claude-sonnet-4-6",
        max_tokens: 400,
        system: systemPrompt,
        messages: [{ role: "user", content: message.content.trim() }],
      }),
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
    });
    if (!upstream.ok)
      return json(
        {
          error:
            "The AI assistant is unavailable. Please try the profile guide.",
        },
        502,
      );
    const data = await upstream.json();
    const reply = Array.isArray(data.content)
      ? data.content
          .filter(
            (c: { type?: string; text?: unknown }) =>
              c.type === "text" && typeof c.text === "string",
          )
          .map((c: { text: string }) => c.text)
          .join("\n")
          .trim()
      : "";
    if (!reply)
      return json({ error: "The assistant couldn’t find an answer." }, 502);
    return json({ reply });
  } catch {
    return json(
      {
        error:
          "The AI assistant couldn’t connect. Please try the profile guide.",
      },
      502,
    );
  }
}
