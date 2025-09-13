"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function AuthNav() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        {/* Show user name on larger screens */}
        <span className="text-sm font-medium hidden sm:block">{session.user?.name}</span>
        
        {/* Dropdown menu for all screen sizes */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium">
                    {session.user?.name?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="w-full">
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="w-full">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
        Sign In
      </Button>
    </div>
  )
}
