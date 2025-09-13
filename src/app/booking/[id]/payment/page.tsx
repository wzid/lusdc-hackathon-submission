"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import type { Listing, Profile } from "@/lib/types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Shield, Calendar, MapPin } from "lucide-react"
import { format } from "date-fns"

interface PaymentPageProps {
  params: Promise<{ id: string }>
}

export default function PaymentPage({ params }: PaymentPageProps) {
  interface BookingData {
    id: number
    itemId: number
    renterId: string
    startDate: number
    endDate: number
    totalPrice: number
    status: string
    item?: Listing
    owner?: Profile
  }
  const [booking, setBooking] = useState<BookingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  const router = useRouter()

  useEffect(() => {
    fetchBooking()
  }, [])

  const fetchBooking = async () => {
    const { id } = await params
    try {
      const res = await fetch(`/api/bookings/${id}`)
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error ?? "Booking not found")
      setBooking(data as BookingData)
    } catch {
      setBooking(null)
    }
    setLoading(false)
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!booking) return

    setProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      router.push(`/booking/${booking.id}/confirmation`)
    } catch (error) {
      console.error("Payment error:", error)
      alert("Payment failed. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading booking details...</p>
        </div>
      </div>
    )
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
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/listing/${booking.item?.id ?? ""}`}> 
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Listing
            </Link>
          </Button>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Complete your booking</h1>
            <p className="text-muted-foreground">Review your details and confirm payment</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Doe"
                        value={paymentData.cardholderName}
                        onChange={(e) => setPaymentData({ ...paymentData, cardholderName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button type="submit" className="w-full" size="lg" disabled={processing}>
                        {processing ? "Processing Payment..." : `Pay $${booking.totalPrice?.toFixed(2) ?? "0.00"}`}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                    <div className="space-y-1">
                      <div className="font-medium">Your payment is secure</div>
                      <div className="text-sm text-muted-foreground">
                        We use industry-standard encryption to protect your payment information. Your card details are
                        never stored on our servers.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Listing Info */}
                  <div className="flex gap-4">
                    <div className="w-20 h-16 bg-muted rounded-lg flex-shrink-0"></div>
                    <div className="space-y-1">
                      <div className="font-semibold">{booking.item?.name ?? "Unknown item"}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {booking.item?.location ?? "Unknown location"}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Dates */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">Rental Period</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {booking.startDate && booking.endDate ? (
                        <>
                          {format(new Date(booking.startDate * 1000), "MMM dd, yyyy")} - {format(new Date(booking.endDate * 1000), "MMM dd, yyyy")}
                        </>
                      ) : "Dates unknown"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {booking.startDate && booking.endDate ? (
                        <>
                          {Math.max(1, Math.ceil((booking.endDate - booking.startDate) / 86400))} {Math.max(1, Math.ceil((booking.endDate - booking.startDate) / 86400)) === 1 ? "day" : "days"}
                        </>
                      ) : "Duration unknown"}
                    </div>
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        ${booking.item?.pricePerDay ?? 0} × {booking.startDate && booking.endDate ? Math.max(1, Math.ceil((booking.endDate - booking.startDate) / 86400)) : 0} days
                      </span>
                      <span>${booking.totalPrice?.toFixed(2) ?? "0.00"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service fee</span>
                      <span>${booking.totalPrice ? (booking.totalPrice * 0.15).toFixed(2) : "0.00"}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${booking.totalPrice ? (booking.totalPrice * 1.15).toFixed(2) : "0.00"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cancellation Policy */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Cancellation Policy</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>Free cancellation up to 24 hours before your rental starts.</p>
                  <p>Cancellations within 24 hours are subject to a 50% fee.</p>
                  <p>No-shows forfeit the full payment.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
