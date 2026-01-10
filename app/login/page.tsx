"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { AuthLayout } from "@/components/auth/auth-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const supabase = createClient()
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log("[v0] Login response:", { data, signInError })

    if (signInError) {
      console.log("[v0] Login error:", signInError.message)
      setError(signInError.message)
      setLoading(false)
      return
    }

    const { data: sessionData } = await supabase.auth.getSession()
    console.log("[v0] Session after login:", sessionData)

    console.log("[v0] Redirecting to /chat")
    window.location.href = "/chat"
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue planning with PlantraX">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="bg-input border-border focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="bg-input border-border focus:border-primary"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-accent hover:text-background">
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        <p className="text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:text-accent">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
