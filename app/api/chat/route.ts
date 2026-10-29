import { handleChat } from "@/lib/chat";

export const runtime = "nodejs";

export function POST(request: Request) {
  return handleChat(request, {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    ANTHROPIC_MODEL: process.env.ANTHROPIC_MODEL,
  });
}
