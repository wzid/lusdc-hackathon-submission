"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { useSession } from "next-auth/react"
export default function DashboardPage() {

  const [listings, setListings] = useState<any[]>([])
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.id) {
      setListings([]);
      setBookings([]);
      setLoading(false);
      return;
    }
    const userId = session.user.id;
    const fetchDashboardData = async () => {
      setLoading(true);
      // Fetch listings owned by user
      const listingsRes = await fetch(`/api/listings?ownerId=${userId}`);
      const listingsData = listingsRes.ok ? await listingsRes.json() : [];
      setListings(listingsData);
      // Fetch bookings made by user
      const bookingsRes = await fetch(`/api/bookings?userId=${userId}`);
      const bookingsData = bookingsRes.ok ? await bookingsRes.json() : [];
      setBookings(bookingsData);
      setLoading(false);
    };
    fetchDashboardData();
  }, [session, status]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Listings Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {listings.map((listing) => (
                <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-2">
                    <div className="font-medium">{listing.name}</div>
                    <div className="text-sm text-muted-foreground">{listing.location}</div>
                  </div>
                  <Link href={`/listing/${listing.id}`}>View</Link>
                </div>
              ))}
              {listings.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No listings yet. Create your first listing to get started!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bookings Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex gap-4 items-center">
                    {booking.pictureList ? (
                      <img
                        src={booking.pictureList}
                        alt={booking.itemName ?? "Listing image"}
                        className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                    ) : (
                      <img
                        src="/placeholder.jpg"
                        alt="Placeholder"
                        className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="space-y-2">
                      <div className="font-medium">{booking.itemName ?? "Unknown item"}</div>
                      <div className="text-sm text-muted-foreground">
                        {booking.startDate && booking.endDate ? (
                          <>
                            {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                          </>
                        ) : "Dates unknown"}
                      </div>
                      <div className="text-sm">Status: {booking.status}</div>
                    </div>
                  </div>
                  <Link href={`/booking/${booking.id}/confirmation`}>View</Link>
                </div>
              ))}
              {bookings.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No bookings yet. Book something to get started!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
