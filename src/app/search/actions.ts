"use server"

import { db } from "~/server/db";
import { items } from "~/server/db/schema";

export async function getListingsFromDb({
  search = "",
  category = "",
  location = "",
  priceRange = [0, 200],
  sortBy = "newest",
}: {
  search?: string;
  category?: string;
  location?: string;
  priceRange?: [number, number];
  sortBy?: string;
}) {
  // Basic query, you can extend with joins, filters, etc.
  const query = db.select().from(items);
  // Filtering logic can be added here if using drizzle ORM advanced features
  // For now, fetch all and filter in JS
  const allListings = await query;
  // Remove is_active filter (not present in schema)
  let filteredListings = allListings;

  if (search) {
    filteredListings = filteredListings.filter(
      (listing) =>
        (listing.name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
        (listing.description?.toLowerCase().includes(search.toLowerCase()) ?? false)
    );
  }
  
  if (category && category !== "all" && category !== "null") {
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
      return price >= priceRange[0] && price <= priceRange[1];
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

  return filteredListings;
}
