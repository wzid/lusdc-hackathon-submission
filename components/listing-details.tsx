"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookingCard } from "@/components/booking-card"
import type { Listing } from "@/lib/types"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Star, User, ArrowLeft } from "lucide-react"

interface ListingDetailsProps {
  listing: Listing
}


  const categories = [
    "Dirt Bike",
    "Electric Bike",
    "",
    "Road Bike",
    "Mountain Bike",
    "Snowboard",
    "Canoe",
    "Kayak",
    "Moped",
    "Electric Scooter",
    "4-Wheel ATV",
    "Paddleboard",
    "Jet Ski",
    "Skidoo",
    "Snow Skis",
  ]

  const getIconForCategory = (categoryName: string | undefined) => {
  switch (categoryName) {
    case "Dirt Bike":
      return "🏍️"
    case "Electric Bike":
      return "🚲"
    case "Road Bike":
      return "🚴"
    case "Mountain Bike":
      return "⛰️"
    case "Snowboard":
      return "🏂"
    case "Canoe":
      return "🛶"
    case "Kayak":
      return "🛶"
    case "Moped":
      return "🛵"
    case "Electric Scooter":
      return "🛴"
    case "4-Wheel ATV":
      return "🛻"
    case "Paddleboard":
      return "🏄"
    case "Jet Ski":
      return "🚤"
    case "Skidoo":
      return "❄️"
    case "Snow Skis":
      return "⛷️"
    default:
      return "❓"
  }
}

export function ListingDetails({ listing }: ListingDetailsProps) {
  const image = listing.pictureList

  const category = categories[Number(listing.typeId) - 1] ?? "WHAT"

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/search">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Search
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={listing.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Title and Basic Info */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Badge variant="secondary">
                    {getIconForCategory(category)} {category}
                  </Badge>
                  <h1 className="text-3xl font-bold">{listing.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {listing.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">${listing.pricePerDay}</div>
                  <div className="text-muted-foreground">per day</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
              </CardContent>
            </Card>

            {/* Owner Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Meet Your Host
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">
                      {listing.owner?.first_name} {listing.owner?.last_name}
                    </div>
                    <div className="text-sm text-muted-foreground">Joined in 2023 • 15 rentals</div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      4.9 host rating
                    </div>
                  </div>
                </div>
                {listing.owner?.bio && <p className="mt-4 text-sm text-muted-foreground">{listing.owner.bio}</p>}
              </CardContent>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <BookingCard listing={listing} />
          </div>
        </div>
      </div>
    </div>
  )
}
