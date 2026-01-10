import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Plantra<span className="text-primary">X</span>
        </h1>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-foreground hover:text-accent">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-primary hover:bg-accent hover:text-background">Get Started</Button>
          </Link>
        </div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 max-w-3xl">
          Your Personal AI
          <span className="text-primary"> Productivity</span> Assistant
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
          Plan tasks, structure routines, and organize your schedule efficiently with PlantraX. Get focused, actionable
          guidance to achieve your goals.
        </p>
        <Link href="/signup">
          <Button size="lg" className="bg-primary hover:bg-accent hover:text-background text-lg px-8 py-6">
            Start Planning Now
          </Button>
        </Link>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-xl font-semibold mb-3 text-primary">Task Planning</h3>
            <p className="text-muted-foreground">Break down complex goals into manageable daily tasks and routines.</p>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-xl font-semibold mb-3 text-primary">Smart Scheduling</h3>
            <p className="text-muted-foreground">
              Get AI-powered schedule suggestions optimized for your productivity.
            </p>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-xl font-semibold mb-3 text-primary">Routine Builder</h3>
            <p className="text-muted-foreground">Create and maintain healthy routines with personalized guidance.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
