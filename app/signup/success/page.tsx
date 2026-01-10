import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignupSuccessPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4">Check your email</h1>
        <p className="text-muted-foreground mb-8">
          We&apos;ve sent you a confirmation link. Please check your email to verify your account and start using
          PlantraX.
        </p>
        <Link href="/login">
          <Button className="bg-primary hover:bg-accent hover:text-background">Back to Login</Button>
        </Link>
      </div>
    </main>
  )
}
