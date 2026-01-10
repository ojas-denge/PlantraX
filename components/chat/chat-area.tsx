"use client"

import { useEffect, useRef } from "react"
import { ChatMessage } from "./chat-message"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface ChatAreaProps {
  messages: Message[]
  isLoading?: boolean
}

export function ChatArea({ messages, isLoading }: ChatAreaProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center">
            <p className="text-muted-foreground text-lg mb-2">Welcome to PlantraX</p>
            <p className="text-muted-foreground/70 text-sm">
              Ask me to help plan your tasks, create routines, or organize your schedule.
            </p>
          </div>
        ) : (
          messages.map((message) => <ChatMessage key={message.id} role={message.role} content={message.content} />)
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-secondary px-4 py-3 rounded-2xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  )
}
