"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthLayout } from "@/components/auth/auth-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/chat`,
        data: { name },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Create profile
    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        name,
        email,
      })
    }

    router.push("/signup/success")
  }

  return (
    <AuthLayout title="Create account" subtitle="Start your productivity journey with PlantraX">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
            className="bg-input border-border focus:border-primary"
          />
        </div>

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
            minLength={6}
            className="bg-input border-border focus:border-primary"
          />
          <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
        </div>

        <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-accent hover:text-background">
          {loading ? "Creating account..." : "Create Account"}
        </Button>

        <p className="text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:text-accent">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
