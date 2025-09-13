import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Calendar, MapPin, Shield, Star, Users, Zap, Heart, Award } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Search,
      title: "Browse & Discover",
      description:
        "Search thousands of adventure gear listings in your destination. Filter by location, dates, and gear type.",
      details: ["Advanced search filters", "Real-time availability", "Verified listings", "Local recommendations"],
    },
    {
      icon: Calendar,
      title: "Book Instantly",
      description:
        "Select your dates, review the details, and book instantly. Most listings offer immediate confirmation.",
      details: ["Instant booking", "Flexible dates", "Clear pricing", "Cancellation protection"],
    },
    {
      icon: MapPin,
      title: "Meet & Collect",
      description: "Coordinate pickup with the owner. Many offer delivery or meet at convenient locations.",
      details: ["Flexible pickup options", "GPS coordinates", "Owner communication", "Safety guidelines"],
    },
    {
      icon: Star,
      title: "Adventure & Return",
      description:
        "Enjoy your adventure! Return the gear in the same condition and leave a review for the next adventurer.",
      details: ["24/7 support", "Damage protection", "Easy returns", "Community reviews"],
    },
  ]

  const benefits = [
    {
      icon: Shield,
      title: "Protected Bookings",
      description: "Every rental is covered by our comprehensive protection plan.",
      color: "text-green-600",
    },
    {
      icon: Users,
      title: "Verified Community",
      description: "All users are verified with ID and background checks.",
      color: "text-blue-600",
    },
    {
      icon: Zap,
      title: "Instant Access",
      description: "Book gear instantly without waiting for approval.",
      color: "text-yellow-600",
    },
    {
      icon: Heart,
      title: "Local Experts",
      description: "Get insider tips from locals who know the best spots.",
      color: "text-red-600",
    },
  ]

  const faqs = [
    {
      question: "What if the gear gets damaged?",
      answer:
        "All rentals include damage protection. Minor wear is expected, but significant damage is covered by our insurance policy.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes! Free cancellation up to 24 hours before pickup. Some listings offer more flexible cancellation policies.",
    },
    {
      question: "How do I know the gear is safe?",
      answer:
        "All gear is inspected by owners before each rental. We also provide safety guidelines and require maintenance records for certain equipment.",
    },
    {
      question: "What if I need help during my rental?",
      answer:
        "Our 24/7 support team is always available. Plus, many owners provide their contact info for local assistance.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-teal-50">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">How Things to Rent Works</h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto mb-8">
            Rent adventure gear from locals in 4 simple steps. Skip the hassle of buying expensive equipment you'll only
            use once and discover amazing gear from fellow adventurers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Link href="/search">Start Exploring</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/list">List Your Gear</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Rent in 4 Easy Steps</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                  <CardDescription className="text-gray-600">{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-500 space-y-1">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center justify-center gap-2">
                        <div className="w-1 h-1 bg-teal-500 rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Things to Rent?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-0 shadow-md">
                <CardContent className="pt-6">
                  <benefit.icon className={`w-12 h-12 mx-auto mb-4 ${benefit.color}`} />
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Owners Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Earn Money from Your Gear</h2>
              <p className="text-gray-600 mb-6">
                Turn your unused adventure equipment into a steady income stream. List your bikes, kayaks, skis, and
                more to help fellow adventurers while earning extra cash.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-teal-600" />
                  <span>Earn up to $200+ per month per item</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-teal-600" />
                  <span>$1M insurance coverage included</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-teal-600" />
                  <span>Connect with your local adventure community</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-teal-600" />
                  <span>Set your own schedule and pricing</span>
                </div>
              </div>
              <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
                <Link href="/list">Start Earning Today</Link>
              </Button>
            </div>
            <div className="bg-gradient-to-br from-teal-100 to-orange-100 rounded-2xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Average Monthly Earnings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-2xl font-bold text-teal-600">$180</p>
                    <p className="text-sm text-gray-600">Mountain Bike</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-2xl font-bold text-teal-600">$120</p>
                    <p className="text-sm text-gray-600">Kayak</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-2xl font-bold text-teal-600">$95</p>
                    <p className="text-sm text-gray-600">Surfboard</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-2xl font-bold text-teal-600">$150</p>
                    <p className="text-sm text-gray-600">E-Scooter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-teal-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of adventurers who are already exploring the world with Things to Rent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/search">Find Gear Near You</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
            >
              <Link href="/list">List Your Gear</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
