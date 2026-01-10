"use client"

import { useState } from "react"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { ChatArea } from "@/components/chat/chat-area"
import { ChatInput } from "@/components/chat/chat-input"
import { createClient } from "@/lib/supabase/client"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface ChatClientProps {
  user: {
    id: string
    name: string
    email: string
  }
  initialMessages: Message[]
}

export function ChatClient({ user, initialMessages }: ChatClientProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.content,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearHistory = async () => {
    const supabase = createClient()
    await supabase.from("chats").delete().eq("user_id", user.id)
    setMessages([])
  }

  return (
    <div className="h-screen bg-background flex">
      <ChatSidebar user={user} onClearHistory={handleClearHistory} />
      <main className="flex-1 flex flex-col min-w-0">
        <ChatArea messages={messages} isLoading={isLoading} />
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </main>
    </div>
  )
}
