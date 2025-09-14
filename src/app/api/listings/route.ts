import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { items } from "~/server/db/schema";

export async function GET(request: Request) {
  // Parse query params for filters
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const location = searchParams.get("location") ?? "";
  const priceMin = Number(searchParams.get("priceMin")) ?? 0;
  const priceMax = Number(searchParams.get("priceMax")) ?? 200;
  const sortBy = searchParams.get("sortBy") ?? "newest";
  const ownerId = searchParams.get("ownerId") ?? "";

  // Fetch all listings
  let filteredListings = await db.select().from(items);
  if (ownerId) {
    console.log("Filtering listings for ownerId:", ownerId);
    filteredListings = filteredListings.filter((listing) => String(listing.ownerId) === String(ownerId));
    return NextResponse.json(filteredListings);
  }

  if (search) {
    filteredListings = filteredListings.filter(
      (listing) =>
        (listing.name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
        (listing.description?.toLowerCase().includes(search.toLowerCase()) ?? false)
    );
  }
  if (category && category !== "0") {
    filteredListings = filteredListings.filter((listing) => String(listing.typeId) === category);
  }
  if (location) {
    filteredListings = filteredListings.filter((listing) =>
      listing.location?.toLowerCase().includes(location.toLowerCase())
    );
  }
  filteredListings = filteredListings.filter(
    (listing) => {
      const price = listing.pricePerDay ?? 0;
      return price >= priceMin && price <= priceMax;
    }
  );

  switch (sortBy) {
    case "price_low":
      filteredListings.sort((a, b) => (a.pricePerDay ?? 0) - (b.pricePerDay ?? 0));
      break;
    case "price_high":
      filteredListings.sort((a, b) => (b.pricePerDay ?? 0) - (a.pricePerDay ?? 0));
      break;
    case "newest":
    default:
      filteredListings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return NextResponse.json(filteredListings);
}
