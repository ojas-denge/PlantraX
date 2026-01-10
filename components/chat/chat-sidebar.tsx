"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Menu, X, Trash2, LogOut } from "lucide-react"

interface ChatSidebarProps {
  user: {
    name: string
    email: string
  }
  onClearHistory: () => void
}

export function ChatSidebar({ user, onClearHistory }: ChatSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [clearing, setClearing] = useState(false)
  const router = useRouter()

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  const handleClearHistory = async () => {
    setClearing(true)
    await onClearHistory()
    setClearing(false)
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-semibold">
          Plantra<span className="text-primary">X</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-1">AI Productivity Assistant</p>
      </div>

      {/* App Description */}
      <div className="p-6 border-b border-border">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Plan tasks, structure routines, and organize your schedule with focused, actionable guidance.
        </p>
        <div className="mt-4 space-y-2">
          <p className="text-xs text-accent font-medium">Quick Tips:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Ask for daily/weekly schedules</li>
            <li>• Break down goals into tasks</li>
            <li>• Get routine suggestions</li>
          </ul>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User Profile */}
      <div className="p-6 border-t border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-medium">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearHistory}
            disabled={clearing}
            className="w-full justify-start border-border hover:bg-secondary bg-transparent"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {clearing ? "Clearing..." : "Clear History"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start border-border hover:bg-secondary bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg border border-border"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-72 bg-card border-r border-border
          transform transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
