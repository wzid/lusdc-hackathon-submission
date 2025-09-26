"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ListingCard } from "@/components/listing-card"
import { getListingsFromDb } from "./actions"
import Link from "next/link"
import { MapPin, Filter, Grid, List } from "lucide-react"
import { set } from "date-fns"

export default function SearchPage() {
  const [listings, setListings] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    location: "",
    priceRange: [0, 200],
    sortBy: "newest",
  })

  const REAL_categories = [
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

  useEffect(() => {
      setCategories([
    "Dirt Bike",
    "Electric Bike",
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
  ])
    const fetchListings = async () => {
      setLoading(true);
      try {
const params = new URLSearchParams({
  search: filters.search,
  category: (filters.category == "all" || filters.category == "") ? "0" : String(REAL_categories.indexOf(filters.category) + 1),
  location: filters.location,
  priceMin: String(filters.priceRange[0]),
  priceMax: String(filters.priceRange[1]),
  sortBy: filters.sortBy,
});
        const res = await fetch(`/api/listings?${params.toString()}`);
        const data = await res.json();
        console.log("Fetched listings:", data);
        setListings(data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
      setLoading(false);
    };
    fetchListings();
  }, [filters]);

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search gear..."
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Enter city or area..."
                  value={filters.location}
                  onChange={(e) => updateFilter("location", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((category: string, i) => (
                    <SelectItem key={i} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <label className="text-sm font-medium">Price per day</label>
              <div className="px-2">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilter("priceRange", value)}
                  max={500}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>

            {/* Clear Filters */}
            <Button
              variant="outline"
              onClick={() =>
                setFilters({
                  search: "",
                  category: "",
                  location: "",
                  priceRange: [0, 200],
                  sortBy: "newest",
                })
              }
              className="w-full"
            >
              Clear All Filters
            </Button>
          </div>

          {/* Results */}
          <div className="flex-1 space-y-6">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">
                  {loading ? "Searching..." : `${listings.length} rentals available`}
                </h1>
                {filters.location && <p className="text-muted-foreground">in {filters.location}</p>}
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Grid/List */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-muted rounded-t-lg" />
                    <CardContent className="p-4 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                      <div className="h-3 bg-muted rounded w-1/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No rentals found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
                <Button
                  onClick={() =>
                    setFilters({
                      search: "",
                      category: "",
                      location: "",
                      priceRange: [0, 200],
                      sortBy: "newest",
                    })
                  }
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
