import Link from "next/link"
import Image from "next/image"
import { AuthNav } from "~/components/auth-nav"

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary hover:text-primary/80 transition-colors whitespace-nowrap">
              <Image 
                src="/favicon.ico" 
                alt="Things to Rent" 
                width={32} 
                height={32} 
                className="rounded-full"
              />
              <span className="hidden sm:inline">Things to Rent</span>
            </Link>
          </div>
          <div className="flex items-center gap-3 md:gap-6 text-xs md:text-sm">
            <Link href="/search" className="font-medium hover:text-primary transition-colors">
              <span className="md:hidden">Browse</span>
              <span className="hidden md:inline">Browse Rentals</span>
            </Link>
            <Link href="/list" className="font-medium hover:text-primary transition-colors">
              <span className="md:hidden">Sell</span>
              <span className="hidden md:inline">List Your Gear</span>
            </Link>
            <Link href="/how-it-works" className="font-medium hover:text-primary transition-colors">
              <span className="md:hidden">About</span>
              <span className="hidden md:inline">How It Works</span>
            </Link>
          </div>
          <AuthNav />
        </div>
      </div>
    </nav>
  )
}
