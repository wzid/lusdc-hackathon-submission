import { mockListings } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import { ListingDetails } from "@/components/listing-details"

interface ListingPageProps {
  params: Promise<{ id: string }>
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params

  const listing = mockListings.find((l) => l.id === id && l.is_active)

  if (!listing) {
    notFound()
  }

  return <ListingDetails listing={listing} />
}
