"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useRouter } from "next/navigation"
import { CalendarIcon, Shield, AlertCircle, CreditCard } from "lucide-react"
import { format, differenceInDays, isBefore, startOfDay } from "date-fns"
import { cn } from "@/lib/utils"

import { type Listing } from "@/lib/types"

interface BookingCardProps {
  listing: Listing
}

export function BookingCard({ listing }: BookingCardProps) {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [isLoading, setIsLoading] = useState(false)
  const [bookedDates, setBookedDates] = useState<Date[]>([])
  const [error, setError] = useState<string>("");

  const router = useRouter()
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    fetchBookedDates()
  }, [])

  const fetchBookedDates = async () => {
    const dates: Date[] = []
    // Add some mock booked dates for demonstration
    const today = new Date()
    dates.push(new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000)) // 5 days from now
    dates.push(new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000)) // 6 days from now
    setBookedDates(dates)
  }

  const totalDays = startDate && endDate ? differenceInDays(endDate, startDate) : 0
  const subtotal = totalDays * listing.pricePerDay
  const serviceFee = subtotal * 0.15
  const total = subtotal + serviceFee

  const isDateDisabled = (date: Date) => {
    const today = startOfDay(new Date())
    if (isBefore(date, today)) return true

    return bookedDates.some((bookedDate) => date.toDateString() === bookedDate.toDateString())
  }

  const handleBooking = async () => {
    

    setError("");
    if (!user) {
      setError("You must be logged in to book. Please sign in first.");
      return;
    }
    if (!startDate || !endDate) return;
    if (totalDays < listing.min_rental_days) {
      alert(`Minimum rental period is ${listing.min_rental_days} days`);
      return;
    }
    if (totalDays > listing.max_rental_days) {
      alert(`Maximum rental period is ${listing.max_rental_days} days`);
      return;
    }
    setIsLoading(true);
    try {
      // Create booking in DB
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: listing.id,
          startDate,
          endDate,
          totalPrice: total,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.bookingId) {
        throw new Error(data.error || "Booking failed");
      }
  router.push(`/booking/${data.bookingId}/confirmation`);
    } catch (error: any) {
      console.error("Booking error:", error);
      console.log("Error details:", data);
      setError(error.message || "Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="sticky top-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>${listing.pricePerDay} per day</span>
            <Badge variant="outline">
              <Shield className="w-3 h-3 mr-1" />
              Protected
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Date Selection */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "MMM dd") : "Check-in"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    selected={startDate ?? null}
                    onChange={date => setStartDate(date ?? undefined)}
                    minDate={new Date()}
                    excludeDates={bookedDates}
                    placeholderText="Select check-in date"
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "MMM dd") : "Check-out"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    selected={endDate ?? null}
                    onChange={date => setEndDate(date ?? undefined)}
                    minDate={startDate ?? new Date()}
                    excludeDates={bookedDates}
                    placeholderText="Select check-out date"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {startDate && endDate && totalDays > 0 && (
              <div className="text-sm text-muted-foreground">
                {totalDays} {totalDays === 1 ? "day" : "days"} selected
              </div>
            )}
          </div>

          {/* Rental Requirements */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Minimum rental:</span>
              <span>{listing.min_rental_days} days</span>
            </div>
            <div className="flex justify-between">
              <span>Maximum rental:</span>
              <span>{listing.max_rental_days} days</span>
            </div>
          </div>

          {/* Price Breakdown */}
          {startDate && endDate && totalDays > 0 && (
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span>
                  ${listing.pricePerDay} × {totalDays} days
                </span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service fee</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Booking Actions */}
          <div className="space-y-3">
            <Button
              className="w-full cursor-pointer"
              size="lg"
              onClick={handleBooking}
              disabled={!startDate || !endDate || totalDays === 0 || isLoading}
            >
              {isLoading ? "Creating Booking..." : "Book Now"}
            </Button>
            {error && (
              <div className="text-center text-sm text-red-600 mt-2">{error}</div>
            )}
          </div>

          {startDate && endDate && totalDays > 0 && totalDays < listing.min_rental_days && (
            <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                Minimum rental period is {listing.min_rental_days} days. Please select a longer period.
              </div>
            </div>
          )}

          <div className="text-center text-sm text-muted-foreground">You won't be charged yet</div>

          {/* Protection Features */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Damage protection included</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="w-4 h-4 text-blue-500" />
              <span>Free cancellation up to 24h</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
