import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";

import { Send, Sparkles, Upload, Loader2, Paperclip } from "lucide-react";
import { toast } from "sonner";

import { TopBar } from "@/components/top-bar";
import { promptTemplates } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/assistant")({
  head: () => ({
    meta: [{ title: "AI Assistant — AI Solution Hub" }],
  }),
  component: AssistantPage,
});

function AssistantPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [uploadedText, setUploadedText] = useState<string | null>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  function submitMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const fullPrompt = uploadedText
      ? `Use this uploaded document as context:\n\n${uploadedText}\n\nUser Question:\n${trimmed}`
      : trimmed;

    sendMessage({ text: fullPrompt });
    setInput("");
  }

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 300000) {
      toast.error("File too large. Keep it under 300KB.");
      return;
    }
    file.text().then((text) => {
      setUploadedText(text);
      toast.success(`${file.name} uploaded successfully`);
    });
  }

  // Extract text from a UIMessage's parts array
  function getMessageText(message: (typeof messages)[0]): string {
    return message.parts
      .map((part) => (part.type === "text" ? part.text : ""))
      .join("");
  }

  return (
    <>
      <TopBar
        title="AI Assistant"
        subtitle="Generate summaries, insights, and smart recommendations."
      />

      <div className="flex flex-col flex-1 min-h-0 p-6 pb-28">
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto rounded-3xl glass p-5 md:p-6 space-y-5 min-h-[60vh]"
        >
          {messages.length === 0 && (
            <EmptyState onPick={submitMessage} />
          )}

          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : ""
                }`}
              >
                {message.role === "assistant" && (
                  <div className="size-9 rounded-xl gradient-brand grid place-items-center shadow-glow shrink-0">
                    <Sparkles className="size-4 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    message.role === "user"
                      ? "gradient-brand text-white shadow-glow"
                      : "glass-strong"
                  }`}
                >
                  <div className="prose prose-sm prose-invert max-w-none">
                    <ReactMarkdown>{getMessageText(message)}</ReactMarkdown>
                  </div>
                </div>

                {message.role === "user" && (
                  <div className="size-9 rounded-full gradient-brand grid place-items-center text-xs font-semibold text-white shrink-0">
                    YOU
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="size-9 rounded-xl gradient-brand grid place-items-center shadow-glow">
                <Loader2 className="size-4 text-white animate-spin" />
              </div>
              AI is thinking...
            </div>
          )}
        </div>

        {uploadedText && (
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Paperclip className="size-3" />
            Document attached ({uploadedText.length.toLocaleString()} chars)
            <button
              onClick={() => setUploadedText(null)}
              className="text-primary hover:underline"
            >
              remove
            </button>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitMessage(input);
          }}
          className="mt-4 glass-strong rounded-2xl p-2 flex items-end gap-2"
        >
          <label className="size-11 rounded-xl grid place-items-center hover:bg-white/10 transition cursor-pointer">
            <Upload className="size-4" />
            <input
              type="file"
              accept=".txt,.md,.csv,.json"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={1}
            placeholder="Ask AI anything..."
            className="flex-1 bg-transparent outline-none resize-none px-2 py-2 text-sm max-h-40"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submitMessage(input);
              }
            }}
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="size-11 rounded-xl gradient-brand grid place-items-center shadow-glow hover:opacity-90 transition disabled:opacity-50"
          >
            <Send className="size-4 text-white" />
          </button>
        </form>
      </div>
    </>
  );
}

function EmptyState({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <div className="py-10 text-center">
      <div className="size-16 rounded-2xl gradient-brand grid place-items-center shadow-glow mx-auto">
        <Sparkles className="size-7 text-white" />
      </div>

      <h2 className="mt-5 text-3xl font-semibold tracking-tight">
        Welcome to AI Solution Hub
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Generate summaries, insights, recommendations, and AI-powered responses.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
        {promptTemplates.map((template) => (
          <button
            key={template.title}
            onClick={() => onPick(template.prompt)}
            className="glass rounded-2xl p-4 hover:bg-white/[0.08] transition"
          >
            <div className="font-medium">{template.title}</div>
            <div className="text-xs text-muted-foreground mt-2 line-clamp-2">
              {template.prompt}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
