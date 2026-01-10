import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { ChatClient } from "./chat-client"

export default async function ChatPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("name, email").eq("id", user.id).maybeSingle()

  if (!profile) {
    const userName = user.user_metadata?.name || user.email?.split("@")[0] || "User"
    await supabase.from("profiles").upsert(
      {
        id: user.id,
        name: userName,
        email: user.email,
      },
      { onConflict: "id" },
    )
  }

  // Get chat history
  const { data: messages } = await supabase
    .from("chats")
    .select("id, role, content")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })

  return (
    <ChatClient
      user={{
        id: user.id,
        name: profile?.name || user.user_metadata?.name || user.email?.split("@")[0] || "User",
        email: profile?.email || user.email || "",
      }}
      initialMessages={messages || []}
    />
  )
}
