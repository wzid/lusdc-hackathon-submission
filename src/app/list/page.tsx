"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, MapPin, DollarSign, Shield, Star } from "lucide-react"

import { publishListingServerAction } from "./actions";

export default function ListGearPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [showStepError, setShowStepError] = useState(false)
  const router = useRouter()

  type GearFormData = {
    title: string
    description: string
    category: string
    location: string
    pricePerDay: string
    features: string[]
    image: File | null
  }

  const [formData, setFormData] = useState<GearFormData>({
    title: "",
    description: "",
    category: "",
    location: "",
    pricePerDay: "",
    features: [] as string[],
    image: null,
  })

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

  const publishListing = async (fd: GearFormData) => {
    setError(null);
    try {
      if (!fd.image) throw new Error("Please upload an image.");
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result?.split(",")[1] ?? result ?? "";
          resolve(base64);
        };
        reader.onerror = () => reject(new Error(reader.error?.message ?? "File read error"));
        reader.readAsDataURL(fd.image);
      });
      await publishListingServerAction({
        typeId: categories.indexOf(fd.category) + 1,
        title: fd.title,
        description: fd.description,
        pricePerDay: parseInt(fd.pricePerDay) || 0,
        base64Image: base64,
        location: fd.location,
      });
      router.push("/search");
    } catch (err: any) {
      setError(err?.message || "Failed to publish listing.");
      console.error("Error uploading images or publishing listing:", err);
    }
  };

  const steps = [
    { number: 1, title: "Basic Info", description: "Tell us about your gear" },
    { number: 2, title: "Details", description: "Add photos and features" },
    { number: 3, title: "Pricing", description: "Set your rates" },
    { number: 4, title: "Review", description: "Publish your listing" },
  ]

  // Ref for file input
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleChooseFilesClick = () => {
    fileInputRef.current?.click();
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">List Your Adventure Gear</h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto px-2">
            Turn your unused gear into income. Share your adventure equipment with fellow travelers.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-6 sm:mb-8">
          {/* Mobile Progress - Only 2 Dots */}
          <div className="flex flex-col items-center md:hidden">
            <div className="flex items-center space-x-4">
              {/* Current Step */}
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 bg-orange-500 border-orange-500 text-white text-sm font-medium">
                  {currentStep}
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium text-orange-600">{steps[currentStep - 1]?.title}</p>
                </div>
              </div>

              {/* Next Step (if not on last step) */}
              {currentStep < steps.length && (
                <>
                  <div className="w-6 h-0.5 bg-gray-300" />
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 text-gray-400 text-sm font-medium">
                      {currentStep + 1}
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium text-gray-400">{steps[currentStep]?.title}</p>
                    </div>
                  </div>
                </>
              )}

              {/* Show "Complete" on last step */}
              {currentStep === steps.length && (
                <>
                  <div className="w-6 h-0.5 bg-orange-500" />
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 bg-green-500 border-green-500 text-white text-sm font-medium">
                      ✓
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium text-green-600">Complete</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Progress indicator */}
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">{steps[currentStep - 1]?.description}</p>
              <p className="text-xs text-gray-400 mt-1">{currentStep} of {steps.length}</p>
            </div>
          </div>

          {/* Desktop Progress - Full Layout */}
          <div className="hidden md:flex justify-center">
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
                  <div className="ml-2">
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
        </div>

        {/* Form Content */}
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">
              <strong>Error:</strong> {error}
            </div>
          )}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {currentStep === 1 && <MapPin className="w-5 h-5" />}
                {currentStep === 2 && <Upload className="w-5 h-5" />}
                {currentStep === 3 && <DollarSign className="w-5 h-5" />}
                {currentStep === 4 && <Star className="w-5 h-5" />}
                {steps[currentStep - 1]?.title ?? ""}
              </CardTitle>
              <CardDescription>{steps[currentStep - 1]?.description ?? ""}</CardDescription>
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: string) => setFormData((prev) => ({ ...prev, category: value }))}
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your gear, its condition, and what makes it special..."
                      rows={4}
                      value={formData.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                </>
              )}

              {/* Step 2: Details */}
              {currentStep === 2 && (
                <>
                  <div className="space-y-4">
                    <Label>Upload Photos</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center">
                      <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                      <p className="text-sm sm:text-base text-gray-600 mb-2">Drag and drop photos here, or click to browse</p>
                      <p className="text-xs sm:text-sm text-gray-500">Upload up to 10 high-quality photos</p>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        onChange={handleFilesChange}
                      />
                      <Button variant="outline" className="mt-3 sm:mt-4 bg-transparent text-sm" type="button" onClick={handleChooseFilesClick}>
                        Choose Files
                      </Button>
                      {formData.images.length > 0 && (
                        <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2 justify-center">
                          {formData.images.map((file, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded break-all max-w-full">
                              {file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}
                            </span>
                          ))}
                        </div>
                      )}
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, pricePerDay: e.target.value }))}
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
                        Your listing will be published immediately.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col gap-2 pt-6">
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={async () => {
                      setShowStepError(false);
                      if (currentStep === 1 && (!formData.location || !formData.category)) {
                        setShowStepError(true);
                        return;
                      }
                      if (currentStep === 3 && !formData.pricePerDay) {
                        setShowStepError(true);
                        return;
                      }
                      if (currentStep === 4) {
                        await publishListing(formData);
                      } else {
                        setCurrentStep(Math.min(4, currentStep + 1));
                      }
                    }}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    {currentStep === 4 ? "Publish Listing" : "Next"}
                  </Button>
                </div>
                {/* Error messages for required fields, only after clicking Next */}
                {showStepError && currentStep === 1 && (!formData.location || !formData.category) && (
                  <div className="mt-2 text-sm text-red-600">
                    Please enter both a location and category to continue.
                  </div>
                )}
                {showStepError && currentStep === 3 && !formData.pricePerDay && (
                  <div className="mt-2 text-sm text-red-600">
                    Please enter a price per day to continue.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
