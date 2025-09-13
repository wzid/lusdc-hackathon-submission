"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Category } from "@/lib/types"
import { MapPin, Filter, X } from "lucide-react"

interface SearchFiltersProps {
  categories: Category[]
  filters: {
    search: string
    category: string
    location: string
    priceRange: number[]
    features: string[]
    sortBy: string
  }
  onFilterChange: (key: string, value: any) => void
  onClearFilters: () => void
}

export function SearchFilters({ categories, filters, onFilterChange, onClearFilters }: SearchFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const features = [
    "Helmet included",
    "GPS tracking",
    "Insurance included",
    "Delivery available",
    "Electric powered",
    "Beginner friendly",
    "Professional grade",
    "Waterproof",
  ]

  const toggleFeature = (feature: string) => {
    const currentFeatures = filters.features || []
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((f) => f !== feature)
      : [...currentFeatures, feature]
    onFilterChange("features", newFeatures)
  }

  const activeFiltersCount = [
    filters.search,
    filters.category,
    filters.location,
    filters.features?.length > 0,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 200,
  ].filter(Boolean).length

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button variant="outline" onClick={() => setShowMobileFilters(!showMobileFilters)} className="w-full">
          <Filter className="w-4 h-4 mr-2" />
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </Button>
      </div>

      {/* Filters */}
      <div className={`space-y-6 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Filters</h2>
            {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount}</Badge>}
          </div>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* Search */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Search</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Search gear..."
              value={filters.search}
              onChange={(e) => onFilterChange("search", e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Enter city or area..."
                value={filters.location}
                onChange={(e) => onFilterChange("location", e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Category */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Category</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={filters.category} onValueChange={(value) => onFilterChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Price Range */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Price per day</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => onFilterChange("priceRange", value)}
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
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature}
                    checked={filters.features?.includes(feature) || false}
                    onCheckedChange={() => toggleFeature(feature)}
                  />
                  <label
                    htmlFor={feature}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {feature}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
