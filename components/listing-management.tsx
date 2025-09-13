"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import type { Listing } from "@/lib/types"
import Link from "next/link"
import Image from "next/image"
import { Edit, Eye, MoreHorizontal, MapPin } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ListingManagementProps {
  listings: Listing[]
  onRefresh: () => void
}

export function ListingManagement({ listings, onRefresh }: ListingManagementProps) {
  const [updatingListing, setUpdatingListing] = useState<string | null>(null)

  const toggleListingStatus = async (listingId: string, isActive: boolean) => {
    setUpdatingListing(listingId)
    // TODO: Update listing status in database
    setTimeout(() => {
      setUpdatingListing(null)
      onRefresh()
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Listings</h2>
          <p className="text-muted-foreground">Manage your rental gear listings</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/create-listing">Create New Listing</Link>
        </Button>
      </div>

      {listings.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">No listings yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first listing to start earning money from your gear
            </p>
            <Button asChild>
              <Link href="/dashboard/create-listing">Create Your First Listing</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {listings.map((listing) => (
            <Card key={listing.id}>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="w-32 h-24 relative flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={listing.images?.[0] || "/adventure-gear.jpg"}
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{listing.title}</h3>
                          <Badge variant="secondary">
                            {listing.category?.icon} {listing.category?.name}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {listing.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="text-xl font-bold">${listing.price_per_day}</div>
                          <div className="text-sm text-muted-foreground">per day</div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/listing/${listing.id}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Listing
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/edit-listing/${listing.id}`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Listing
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{listing.min_rental_days} day minimum</span>
                        <span>•</span>
                        <span>Created {new Date(listing.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{listing.is_active ? "Active" : "Inactive"}</span>
                        <Switch
                          checked={listing.is_active}
                          onCheckedChange={(checked) => toggleListingStatus(listing.id, checked)}
                          disabled={updatingListing === listing.id}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
