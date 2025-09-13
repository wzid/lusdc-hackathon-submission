"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardStats } from "@/components/dashboard-stats"
import { ListingManagement } from "@/components/listing-management"
import { PayoutInfo } from "@/components/payout-info"
import { RevenueChart } from "@/components/revenue-chart"
import { mockListings, mockBookings, type Listing, type Booking } from "@/lib/mock-data"
import Link from "next/link"
import { Plus, Calendar, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeListings: 0,
    totalBookings: 0,
    averageRating: 4.8,
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)

    const userListings = mockListings.filter((listing) => listing.owner_id === "user-1")
    const userBookings = mockBookings.filter((booking) => booking.owner_id === "user-1")

    setListings(userListings)
    setBookings(userBookings)

    // Calculate stats from mock data
    const activeListings = userListings.filter((l) => l.is_active).length
    const totalBookings = userBookings.length
    const totalRevenue = userBookings
      .filter((b) => b.status === "completed")
      .reduce((sum, booking) => sum + booking.total_amount, 0)

    setStats({
      totalRevenue,
      activeListings,
      totalBookings,
      averageRating: 4.8,
    })

    setLoading(false)
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
                <Link href="/search">Browse Rentals</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your listings and track your earnings</p>
          </div>
          <Button asChild>
            <Link href="/list">
              <Plus className="w-4 h-4 mr-2" />
              Create New Listing
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <DashboardStats stats={stats} loading={loading} />

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Revenue Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RevenueChart bookings={bookings} />
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">{booking.listing?.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {booking.renter?.first_name} {booking.renter?.last_name}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${booking.total_amount}</div>
                        <Badge
                          variant={
                            booking.status === "completed"
                              ? "default"
                              : booking.status === "confirmed"
                                ? "secondary"
                                : booking.status === "pending"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {bookings.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No bookings yet. Create your first listing to get started!
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="listings">
            <ListingManagement listings={listings} onRefresh={fetchDashboardData} />
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  All Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-2">
                        <div className="font-medium">{booking.listing?.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {booking.renter?.first_name} {booking.renter?.last_name} •
                          {new Date(booking.start_date).toLocaleDateString()} -{" "}
                          {new Date(booking.end_date).toLocaleDateString()}
                        </div>
                        <div className="text-sm">
                          {booking.total_days} days • ${booking.price_per_day}/day
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-xl font-bold">${booking.total_amount}</div>
                        <Badge
                          variant={
                            booking.status === "completed"
                              ? "default"
                              : booking.status === "confirmed"
                                ? "secondary"
                                : booking.status === "pending"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {bookings.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
                      <p>Your bookings will appear here once customers start renting your gear.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payouts">
            <PayoutInfo bookings={bookings} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
