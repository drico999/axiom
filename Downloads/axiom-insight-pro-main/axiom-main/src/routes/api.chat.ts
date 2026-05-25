import { createFileRoute } from "@tanstack/react-router";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { streamText } from "ai";

// The frontend sends UIMessage[] (ai@6 format) with a `parts` array.
// streamText expects ModelMessage[] with a `content` field.
// This function converts between the two.
function toModelMessages(uiMessages: Array<{
  role: string;
  parts?: Array<{ type: string; text?: string }>;
  content?: string;
}>) {
  return uiMessages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => {
      const text = m.content ?? (m.parts ?? [])
        .filter((p) => p.type === "text")
        .map((p) => p.text ?? "")
        .join("");
      return { role: m.role as "user" | "assistant", content: text };
    });
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const modelMessages = toModelMessages(body.messages ?? []);

          const provider = createOpenAICompatible({
            name: "gemini",
            baseURL:
              "https://generativelanguage.googleapis.com/v1beta/openai",
            headers: {
              Authorization: `Bearer ${process.env.GEMINI_API_KEY ?? ""}`,
            },
          });

          const result = streamText({
            model: provider("gemini-2.5-flash"),
            system:
              "You are a helpful AI assistant for Axiom Insight Pro — a business analytics and insights platform. " +
              "Answer clearly and concisely. Format responses with markdown when helpful.",
            messages: modelMessages,
          });

          return result.toUIMessageStreamResponse();
        } catch (error) {
          console.error(error);
          return new Response("Internal Server Error", { status: 500 });
        }
      },
    },
  },
});
