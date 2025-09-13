import Link from "next/link"
import Image from "next/image"
import { AuthNav } from "~/components/auth-nav"

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
              <Image 
                src="/favicon.ico" 
                alt="Things to Rent" 
                width={32} 
                height={32} 
                className="rounded-full"
              />
              Things to Rent
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/search" className="text-sm font-medium hover:text-primary transition-colors">
              Browse Rentals
            </Link>
            <Link href="/list" className="text-sm font-medium hover:text-primary transition-colors">
              List Your Gear
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
          </div>
          <AuthNav />
        </div>
      </div>
    </nav>
  )
}
