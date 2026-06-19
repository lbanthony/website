// Cloudflare Pages Function — handles POST /api/chat
// Your API key lives in Cloudflare as an environment variable (ANTHROPIC_API_KEY),
// never in this file and never in the browser.

export async function onRequestPost(context) {
  const { request, env } = context;

  // --- The assistant's knowledge. Edit this to describe yourself. ---
  const SYSTEM_PROMPT = `You are a friendly, concise AI assistant embedded on Laura Anthony's personal portfolio website. You answer questions from recruiters and hiring managers about Laura.

ABOUT:
- Name: Laura Anthony
- Title/role: [EDIT: your current title]
- Based in: Atlanta, Georgia
- Experience: 9+ years in [EDIT: your field]
- Specialties: [EDIT: list your top skills/specialties]

EXPERIENCE:
[EDIT: paste a few bullets of your work history here]

SKILLS & PROJECTS:
[EDIT: list your key skills and notable projects]

AVAILABILITY & CONTACT:
- Currently open to new opportunities: [EDIT: yes/no + what kind]
- Best way to reach: hello@lanthony.app

RULES:
- Keep answers short (1-3 sentences), warm, and professional.
- Only answer based on the info above. If you don't know something, say you're not sure and suggest they email Laura directly at hello@lanthony.app.
- Never invent facts, dates, or employers.
- If asked something off-topic, gently steer back to Laura's background.`;

  try {
    const body = await request.json();
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return json({ error: "No messages provided." }, 400);
    }

    if (!env.ANTHROPIC_API_KEY) {
      return json({ error: "Server is missing its API key configuration." }, 500);
    }

    const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    if (!apiRes.ok) {
      const detail = await apiRes.text();
      return json({ error: "The assistant is unavailable right now.", detail }, 502);
    }

    const data = await apiRes.json();
    const reply = (data.content || [])
      .filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("\n")
      .trim();

    return json({ reply: reply || "Sorry, I didn't catch that. Could you rephrase?" });
  } catch (err) {
    return json({ error: "Something went wrong handling the request." }, 500);
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json" },
  });
}
