import { handleChat, type ChatEnvironment } from "../../lib/chat";

// Pages serves the exported Next.js page; this function handles only cloud AI.
export function onRequestPost(context: {
  request: Request;
  env: ChatEnvironment;
}) {
  return handleChat(context.request, context.env);
}
