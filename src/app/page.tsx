import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-background to-teal-50 dark:from-orange-950/20 dark:via-background dark:to-teal-950/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  🏄 Adventure Awaits
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                  Rent Adventure Gear for Your Next <span className="text-primary">Vacation</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty max-w-lg">
                  From bikes to paddleboards, skis to jet skis. Discover amazing transportation gear from locals
                  wherever you travel.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8">
                  <Link href="/search">Start Exploring</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-transparent">
                  <Link href="/list">List Your Gear</Link>
                </Button>
              </div>
              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Trusted by 10k+ adventurers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Available in 50+ cities</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-teal-100 dark:from-orange-900/20 dark:to-teal-900/20">
                <Image src="/adventure-sports-collage-with-bikes--kayaks--skis-.jpg" alt="Adventure gear collage" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-card p-4 rounded-xl shadow-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🚴</span>
                  </div>
                  <div>
                    <div className="font-semibold">Mountain Bike</div>
                    <div className="text-sm text-muted-foreground">$35/day</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white dark:bg-card p-4 rounded-xl shadow-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏄</span>
                  </div>
                  <div>
                    <div className="font-semibold">Paddleboard</div>
                    <div className="text-sm text-muted-foreground">$45/day</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Choose Your Adventure</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Explore our wide range of transportation gear for every type of vacation adventure
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Bikes", icon: "🚴", count: "500+" },
              { name: "Water Sports", icon: "🏄", count: "300+" },
              { name: "Snow Sports", icon: "⛷️", count: "200+" },
              { name: "Scooters", icon: "🛴", count: "400+" },
              { name: "Mopeds", icon: "🛵", count: "150+" },
              { name: "ATVs", icon: "🏍️", count: "100+" },
              { name: "Jet Skis", icon: "🚤", count: "80+" },
              { name: "Other", icon: "🚗", count: "250+" },
            ].map((category) => (
              <Card key={category.name} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <div>
                    <div className="font-semibold">{category.name}</div>
                    <div className="text-sm text-muted-foreground">{category.count} available</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Why Choose Things to Rent?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              We make it easy and safe to rent adventure gear from trusted locals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Verified Owners",
                description: "All gear owners are verified with ID and reviews from previous renters",
                icon: "✅",
              },
              {
                title: "Instant Booking",
                description: "Book instantly or send a request. Get confirmed within hours",
                icon: "⚡",
              },
              {
                title: "Insurance Included",
                description: "Every rental includes damage protection and liability coverage",
                icon: "🛡️",
              },
              {
                title: "Local Experts",
                description: "Get insider tips and recommendations from gear owners who know the area",
                icon: "🗺️",
              },
              {
                title: "Flexible Pricing",
                description: "Daily, weekly, and monthly rates. Cancel up to 24 hours before",
                icon: "💰",
              },
              {
                title: "24/7 Support",
                description: "Our team is here to help with any questions or issues during your rental",
                icon: "🎧",
              },
            ].map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardContent className="p-8 space-y-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-pretty">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Ready for Your Next Adventure?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto text-balance">
            Join thousands of adventurers who trust Things to Rent for their vacation gear needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8">
              <Link href="/search">Browse Rentals</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="/list">Earn Money Renting</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="text-2xl font-bold text-primary">Things to Rent</div>
              <p className="text-sm text-muted-foreground">
                The trusted marketplace for vacation transportation gear rentals.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">For Renters</h4>
              <div className="space-y-2 text-sm">
                <Link href="/search" className="block hover:text-primary transition-colors">
                  Browse Gear
                </Link>
                <Link href="/how-it-works" className="block hover:text-primary transition-colors">
                  How It Works
                </Link>
                <Link href="/safety" className="block hover:text-primary transition-colors">
                  Safety
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">For Owners</h4>
              <div className="space-y-2 text-sm">
                <Link href="/list" className="block hover:text-primary transition-colors">
                  List Your Gear
                </Link>
                <Link href="/earnings" className="block hover:text-primary transition-colors">
                  Earnings Calculator
                </Link>
                <Link href="/protection" className="block hover:text-primary transition-colors">
                  Protection Plans
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2 text-sm">
                <Link href="/help" className="block hover:text-primary transition-colors">
                  Help Center
                </Link>
                <Link href="/contact" className="block hover:text-primary transition-colors">
                  Contact Us
                </Link>
                <Link href="/terms" className="block hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Things to Rent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
