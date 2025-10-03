import { notFound } from "next/navigation"
import { ListingDetails } from "@/components/listing-details"
import type { Listing } from "@/lib/types"


interface ListingPageProps {
  params: Promise<{ id: string }>
}

async function getListing(id: string): Promise<Listing | null> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/api/listings/${id}`, {
      cache: 'no-store' // Ensure we get fresh data
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Failed to fetch listing: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching listing:', error)
    return null
  }
}

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const listing = await getListing(id)

  if (!listing) {
    notFound()
  }

  return <ListingDetails listing={listing} />
}
