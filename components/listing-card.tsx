import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Listing } from "@/lib/types"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Star, Calendar } from "lucide-react"

interface ListingCardProps {
  listing: Listing
  viewMode?: "grid" | "list"
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

export function ListingCard({ listing, viewMode = "grid" }: ListingCardProps) {
  const imageUrl = listing.pictureList ?? "/adventure-gear.jpg"
  const category = categories[Number(listing.typeId) - 1] ?? "WHAT"

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <div className="flex">
          <div className="w-64 h-48 relative flex-shrink-0">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={listing.name}
              fill
              className="object-cover rounded-l-lg"
            />
          </div>
          <CardContent className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {listing.category?.icon} {listing.category?.name}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold">{listing.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {listing.location}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">${listing.pricePerDay}</div>
                <div className="text-sm text-muted-foreground">per day</div>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 line-clamp-2">{listing.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {listing.min_rental_days} day min
                </div>
              </div>
              <Button asChild>
                <Link href={`/listing/${listing.id}`}>View Details</Link>
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <Link href={`/listing/${listing.id}`}>
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={listing.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Badge size="sm" variant="secondary" className="bg-white/90 text-black">
              {getIconForCategory(category)} {category}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge className="bg-black/70 text-white">${listing.pricePerDay}/day</Badge>
          </div>
        </div>
        <CardContent className="px-4 pt-4 pb-1 space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {listing.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {listing.location}
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3">{listing.description}</p>
        </CardContent>
      </Link>
    </Card>
  )
}
