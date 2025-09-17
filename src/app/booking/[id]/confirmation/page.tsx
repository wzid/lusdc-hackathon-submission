"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { CheckCircle, Calendar, MapPin, User, Download, MessageCircle } from "lucide-react"
import { format } from "date-fns"


interface ConfirmationPageProps {
  params: { id: string }
}

export default function ConfirmationPage({ params }: ConfirmationPageProps) {
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const id = params.id

  useEffect(() => {
    fetchBooking(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const fetchBooking = async (bookingId: string) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`)
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error ?? "Booking not found")
      setBooking(data)
    } catch {
      setBooking(null)
    }
    setLoading(false)
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }
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
                <Badge variant="secondary">Booking #{String(booking.id).padStart(8, "0")}</Badge>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  Confirmed
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Listing Info */}
              <div className="flex gap-4">
                {booking.item?.pictureList ? (
                  <img
                    src={booking.item?.pictureList}
                    alt={booking.item?.name ?? "Listing image"}
                    className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                ) : (
                  <img
                    src="/placeholder.jpg"
                    alt="Placeholder"
                    className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{booking.item?.name ?? "Unknown item"}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {booking.item?.location ?? "Unknown location"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {booking.startDate && booking.endDate ? (
                      <>
                        {format(new Date(booking.startDate * 1000), "MMM dd, yyyy")} - {format(new Date(booking.endDate * 1000), "MMM dd, yyyy")}
                      </>
                    ) : "Dates unknown"}
                  </div>
                </div>
              </div>

              {/* Host Info */}
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <User className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Your Host</div>
                  <div className="text-sm text-muted-foreground">
                    {booking.owner?.name ?? booking.owner?.email ?? "Unknown host"}
                  </div>
                  <div className="text-sm text-muted-foreground">{booking.owner?.email ?? "No email provided"}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="w-full mb-6">
            {booking.owner?.email ? (
              <Button
                asChild
                variant="outline"
                className="w-full bg-transparent"
              >
                <a href={`mailto:${booking.owner.email}`}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Host
                </a>
              </Button>
            ) : (
              <Button variant="outline" className="w-full bg-transparent" disabled>
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Host
              </Button>
            )}
          </div>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium">1</div>
                  <div>
                    <div className="font-medium">Contact Your Host</div>
                    <div className="text-sm text-muted-foreground">
                      Reach out to your host to arrange payment and coordinate pickup details for your rental.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium">2</div>
                  <div>
                    <div className="font-medium">Pick Up Your Item</div>
                    <div className="text-sm text-muted-foreground">
                      Meet your host at the agreed location and get your gear for the rental period.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium">3</div>
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
