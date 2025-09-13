"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AuthNav() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {session.user?.image && (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="h-8 w-8 rounded-full"
            />
          )}
          <span className="text-sm font-medium">{session.user?.name}</span>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button 
        onClick={(e) => {
          e.preventDefault();
          console.log('Header Google sign-in button clicked');
          signIn("google", { callbackUrl: "/" });
        }}
        type="button"
      >
        Sign In with Google
      </Button>
    </div>
  )
}
