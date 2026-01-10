"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[80%] px-4 py-3 rounded-2xl
          ${isUser ? "bg-transparent border border-primary/50 text-foreground" : "bg-secondary text-foreground"}
        `}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              strong: ({ children }) => <strong className="font-semibold text-accent">{children}</strong>,
              h1: ({ children }) => (
                <h1 className="text-xl font-bold mb-3 mt-4 first:mt-0 text-foreground">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font-semibold mb-2 mt-4 first:mt-0 text-foreground">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base font-semibold mb-2 mt-3 first:mt-0 text-foreground">{children}</h3>
              ),
              ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
              li: ({ children }) => <li className="text-foreground">{children}</li>,
              code: ({ className, children }) => {
                const isBlock = className?.includes("language-")
                return isBlock ? (
                  <pre className="bg-background p-3 rounded-lg overflow-x-auto my-2">
                    <code className="text-sm text-accent">{children}</code>
                  </pre>
                ) : (
                  <code className="bg-background px-1.5 py-0.5 rounded text-sm text-accent">{children}</code>
                )
              },
              table: ({ children }) => (
                <div className="overflow-x-auto my-4">
                  <table className="w-full border-collapse bg-background/50 rounded-lg overflow-hidden">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => <thead className="bg-primary/20 border-b border-primary/30">{children}</thead>,
              tbody: ({ children }) => <tbody className="divide-y divide-border/50">{children}</tbody>,
              tr: ({ children }) => <tr className="hover:bg-primary/5 transition-colors">{children}</tr>,
              th: ({ children }) => (
                <th className="px-4 py-3 text-left font-semibold text-accent text-sm uppercase tracking-wider">
                  {children}
                </th>
              ),
              td: ({ children }) => <td className="px-4 py-3 text-foreground/90">{children}</td>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-4 my-2 text-muted-foreground italic">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  )
}
