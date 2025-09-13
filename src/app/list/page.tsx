"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, MapPin, DollarSign, Shield, Star } from "lucide-react"

export default function ListGearPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    pricePerDay: "",
    features: [] as string[],
    images: [] as File[],
  })

  const categories = [
    "Bicycles & E-bikes",
    "Kayaks & Canoes",
    "Surfboards & SUPs",
    "Skis & Snowboards",
    "Scooters & Mopeds",
    "Camping Gear",
    "Water Sports",
    "Winter Sports",
  ]

  const availableFeatures = [
    "GPS Included",
    "Helmet Included",
    "Lock Included",
    "Delivery Available",
    "Insurance Covered",
    "Maintenance Included",
    "Quick Setup",
    "Beginner Friendly",
  ]

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const steps = [
    { number: 1, title: "Basic Info", description: "Tell us about your gear" },
    { number: 2, title: "Details", description: "Add photos and features" },
    { number: 3, title: "Pricing", description: "Set your rates" },
    { number: 4, title: "Review", description: "Publish your listing" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">List Your Adventure Gear</h1>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto">
            Turn your unused gear into income. Share your adventure equipment with fellow travelers.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number
                      ? "bg-orange-500 border-orange-500 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {step.number}
                </div>
                <div className="ml-2 hidden md:block">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.number ? "text-orange-600" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${currentStep > step.number ? "bg-orange-500" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {currentStep === 1 && <MapPin className="w-5 h-5" />}
                {currentStep === 2 && <Upload className="w-5 h-5" />}
                {currentStep === 3 && <DollarSign className="w-5 h-5" />}
                {currentStep === 4 && <Star className="w-5 h-5" />}
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="title">Listing Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Premium Mountain Bike with Helmet"
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gear category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, State"
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your gear, its condition, and what makes it special..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                </>
              )}

              {/* Step 2: Details */}
              {currentStep === 2 && (
                <>
                  <div className="space-y-4">
                    <Label>Upload Photos</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Drag and drop photos here, or click to browse</p>
                      <p className="text-sm text-gray-500">Upload up to 10 high-quality photos</p>
                      <Button variant="outline" className="mt-4 bg-transparent">
                        Choose Files
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Features & Amenities</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {availableFeatures.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox
                            id={feature}
                            checked={formData.features.includes(feature)}
                            onCheckedChange={() => handleFeatureToggle(feature)}
                          />
                          <Label htmlFor={feature} className="text-sm">
                            {feature}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Pricing */}
              {currentStep === 3 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per Day</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        className="pl-10"
                        value={formData.pricePerDay}
                        onChange={(e) => setFormData((prev) => ({ ...prev, pricePerDay: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Card className="bg-teal-50 border-teal-200">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-5 h-5 text-teal-600" />
                        <h3 className="font-semibold text-teal-800">Pricing Tips</h3>
                      </div>
                      <ul className="text-sm text-teal-700 space-y-1">
                        <li>• Research similar gear in your area</li>
                        <li>• Consider seasonal demand</li>
                        <li>• Factor in wear and maintenance</li>
                        <li>• Start competitive, adjust based on bookings</li>
                      </ul>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">{formData.title || "Your Listing Title"}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">{formData.category || "Category"}</Badge>
                      <Badge variant="outline">{formData.location || "Location"}</Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {formData.description || "Your gear description will appear here..."}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {formData.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <p className="font-bold text-lg">${formData.pricePerDay || "0"}/day</p>
                    </div>
                  </div>

                  <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-orange-800 mb-2">Ready to Go Live?</h3>
                      <p className="text-sm text-orange-700">
                        Your listing will be reviewed and published within 24 hours. You'll receive an email
                        confirmation once it's live.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (currentStep === 1) {
                      // Return to homepage
                      window.location.href = "/"
                    } else {
                      setCurrentStep(Math.max(1, currentStep - 1))
                    }
                  }}
                >
                  {currentStep === 1 ? "Cancel" : "Previous"}
                </Button>
                <Button
                  onClick={() => {
                    if (currentStep === 4) {
                      // Handle form submission
                      console.log("Publishing listing:", formData)
                    } else {
                      setCurrentStep(Math.min(4, currentStep + 1))
                    }
                  }}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {currentStep === 4 ? "Publish Listing" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
