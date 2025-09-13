export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  created_at: string
}

export interface Profile {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  avatar_url?: string
  bio?: string
  created_at: string
  updated_at: string
}

export interface Listing {
  id: string
  owner_id: string
  category_id: string
  title: string
  description: string
  price_per_day: number
  location: string
  latitude?: number
  longitude?: number
  images: string[]
  features: string[]
  availability_start?: string
  availability_end?: string
  min_rental_days: number
  max_rental_days: number
  is_active: boolean
  created_at: string
  updated_at: string
  category?: Category
  owner?: Profile
}

export interface Booking {
  id: string
  listing_id: string
  renter_id: string
  owner_id: string
  start_date: string
  end_date: string
  total_days: number
  price_per_day: number
  subtotal: number
  service_fee: number
  total_amount: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  created_at: string
  updated_at: string
  listing?: Listing
  renter?: Profile
  owner?: Profile
}

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Bikes",
    slug: "bikes",
    description: "Bicycles for city touring and trail riding",
    icon: "🚴",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Scooters",
    slug: "scooters",
    description: "Electric and manual scooters for urban mobility",
    icon: "🛴",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Water Sports",
    slug: "water-sports",
    description: "Paddleboards, kayaks, canoes for water adventures",
    icon: "🏄",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Snow Sports",
    slug: "snow-sports",
    description: "Skis, snowboards for winter recreation",
    icon: "⛷️",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "5",
    name: "ATVs & Dirt Bikes",
    slug: "atvs-dirt-bikes",
    description: "All-terrain vehicles and off-road motorcycles",
    icon: "🏍️",
    created_at: "2024-01-01T00:00:00Z",
  },
]

export const mockProfiles: Profile[] = [
  {
    id: "user-1",
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    phone: "+1-555-0123",
    bio: "Adventure enthusiast and gear collector",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "user-2",
    first_name: "Sarah",
    last_name: "Wilson",
    email: "sarah@example.com",
    phone: "+1-555-0124",
    bio: "Outdoor sports instructor",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
]

export const mockListings: Listing[] = [
  {
    id: "listing-1",
    owner_id: "user-1",
    category_id: "1",
    title: "Premium Mountain Bike - Trek X-Caliber 9",
    description:
      'High-performance mountain bike perfect for trail adventures. Features 29" wheels, 21-speed transmission, and front suspension.',
    price_per_day: 45,
    location: "San Francisco, CA",
    latitude: 37.7749,
    longitude: -122.4194,
    images: ["/adventure-gear.jpg"],
    features: ["21-speed transmission", "Front suspension", '29" wheels', "Disc brakes"],
    min_rental_days: 1,
    max_rental_days: 7,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    category: mockCategories[0],
    owner: mockProfiles[0],
  },
  {
    id: "listing-2",
    owner_id: "user-2",
    category_id: "3",
    title: "Inflatable Paddleboard Set",
    description: "Complete SUP package with board, paddle, pump, and carrying bag. Perfect for lakes and calm waters.",
    price_per_day: 35,
    location: "Lake Tahoe, CA",
    latitude: 39.0968,
    longitude: -120.0324,
    images: ["/adventure-gear.jpg"],
    features: ["Inflatable design", "Complete set", "Carrying bag included", "Suitable for beginners"],
    min_rental_days: 1,
    max_rental_days: 5,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    category: mockCategories[2],
    owner: mockProfiles[1],
  },
  {
    id: "listing-3",
    owner_id: "user-1",
    category_id: "2",
    title: "Electric Scooter - Xiaomi Mi Pro 2",
    description: "Fast and reliable electric scooter for city commuting. 45km range, foldable design.",
    price_per_day: 25,
    location: "Los Angeles, CA",
    latitude: 34.0522,
    longitude: -118.2437,
    images: ["/adventure-gear.jpg"],
    features: ["45km range", "Foldable", "LED display", "App connectivity"],
    min_rental_days: 1,
    max_rental_days: 3,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    category: mockCategories[1],
    owner: mockProfiles[0],
  },
]

export const mockBookings: Booking[] = [
  {
    id: "booking-1",
    listing_id: "listing-1",
    renter_id: "user-2",
    owner_id: "user-1",
    start_date: "2024-02-15",
    end_date: "2024-02-17",
    total_days: 2,
    price_per_day: 45,
    subtotal: 90,
    service_fee: 13.5,
    total_amount: 103.5,
    status: "confirmed",
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-02-01T00:00:00Z",
    listing: mockListings[0],
    renter: mockProfiles[1],
    owner: mockProfiles[0],
  },
]

// Mock user session
export const mockUser = {
  id: "user-1",
  email: "john@example.com",
  created_at: "2024-01-01T00:00:00Z",
}
