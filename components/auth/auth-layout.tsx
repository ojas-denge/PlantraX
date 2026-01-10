import type React from "react"
interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-card p-12 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">
          Plantra<span className="text-primary">X</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your personal AI assistant for planning tasks, structuring routines, and organizing schedules efficiently.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-muted-foreground">Break goals into actionable routines</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-muted-foreground">Get personalized schedule suggestions</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-muted-foreground">Stay focused and productive</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <h1 className="text-3xl font-bold">
              Plantra<span className="text-primary">X</span>
            </h1>
          </div>
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          <p className="text-muted-foreground mb-8">{subtitle}</p>
          {children}
        </div>
      </div>
    </main>
  )
}
