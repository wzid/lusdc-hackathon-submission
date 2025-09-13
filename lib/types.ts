export interface Profile {
  id: string
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  avatar_url?: string
  bio?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  created_at: string
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
  pictureList: string
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
  total_amount: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  created_at: string
  updated_at: string
  listing?: Listing
  renter?: Profile
  owner?: Profile
}

export interface Review {
  id: string
  booking_id: string
  reviewer_id: string
  reviewee_id: string
  listing_id: string
  rating: number
  comment?: string
  created_at: string
  reviewer?: Profile
  reviewee?: Profile
  listing?: Listing
}
