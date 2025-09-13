import { mockBookings } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { CheckCircle, Calendar, MapPin, User, Download, MessageCircle } from "lucide-react"
import { format } from "date-fns"

interface ConfirmationPageProps {
  params: Promise<{ id: string }>
}

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { id } = await params

  const booking = mockBookings.find((b) => b.id === id) || mockBookings[0]

  if (!booking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Booking not found</h1>
          <Button asChild>
            <Link href="/search">Back to Search</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              AdventureRent
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/profile">Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
            <p className="text-muted-foreground mt-2">
              Your rental has been successfully booked. Get ready for your adventure!
            </p>
          </div>

          {/* Booking Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Booking #{booking.id.slice(0, 8)}</Badge>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  Confirmed
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Listing Info */}
              <div className="flex gap-4">
                <div className="w-24 h-20 bg-muted rounded-lg flex-shrink-0"></div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{booking.listing?.title}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {booking.listing?.location}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ${booking.price_per_day}/day • {booking.total_days} days
                  </div>
                </div>
              </div>

              {/* Rental Period */}
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Rental Period</div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(booking.start_date), "EEEE, MMMM dd, yyyy")} -{" "}
                    {format(new Date(booking.end_date), "EEEE, MMMM dd, yyyy")}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {booking.total_days} {booking.total_days === 1 ? "day" : "days"} total
                  </div>
                </div>
              </div>

              {/* Host Info */}
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <User className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Your Host</div>
                  <div className="text-sm text-muted-foreground">
                    {booking.owner?.first_name} {booking.owner?.last_name}
                  </div>
                  <div className="text-sm text-muted-foreground">{booking.owner?.email}</div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({booking.total_days} days)</span>
                    <span>${booking.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service fee</span>
                    <span>${booking.service_fee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total Paid</span>
                    <span>${booking.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Button variant="outline" className="w-full bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message Host
            </Button>
          </div>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium">
                    1
                  </div>
                  <div>
                    <div className="font-medium">Confirmation Email</div>
                    <div className="text-sm text-muted-foreground">
                      Check your email for booking confirmation and pickup instructions
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium">
                    2
                  </div>
                  <div>
                    <div className="font-medium">Contact Your Host</div>
                    <div className="text-sm text-muted-foreground">
                      Coordinate pickup details and ask any questions about the gear
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium">
                    3
                  </div>
                  <div>
                    <div className="font-medium">Enjoy Your Adventure</div>
                    <div className="text-sm text-muted-foreground">Have an amazing time with your rental gear!</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button asChild className="flex-1">
              <Link href="/search">Book Another Rental</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1 bg-transparent">
              <Link href="/dashboard">View My Bookings</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
