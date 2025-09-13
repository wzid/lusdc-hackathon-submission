import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { items } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Convert string ID to number since the database uses integer IDs
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: "Invalid listing ID" },
        { status: 400 }
      );
    }
    
    const listing = await db
      .select()
      .from(items)
      .where(eq(items.id, numericId))
      .limit(1);

    if (listing.length === 0) {
      return NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      );
    }

    // Transform database fields to match frontend expectations
    const item = listing[0]!; // We know it exists because we checked length above
    const transformedListing = {
      id: item.id.toString(), // Convert back to string for frontend
      owner_id: item.ownerId || "",
      category_id: item.typeId?.toString() || "",
      title: item.name || "",
      description: item.description || "",
      price_per_day: item.pricePerDay || 0,
      location: item.location || "",
      images: item.pictureList ? (
        item.pictureList.startsWith('[') || item.pictureList.startsWith('{') 
          ? JSON.parse(item.pictureList) 
          : [item.pictureList]
      ) : [],
      features: [], // Not in current schema
      min_rental_days: 1, // Default value
      max_rental_days: 30, // Default value
      is_active: item.available === 1,
      created_at: item.createdAt && typeof item.createdAt === 'number' ? new Date(item.createdAt * 1000).toISOString() : new Date().toISOString(),
      updated_at: item.updatedAt && typeof item.updatedAt === 'number' ? new Date(item.updatedAt * 1000).toISOString() : (item.createdAt && typeof item.createdAt === 'number' ? new Date(item.createdAt * 1000).toISOString() : new Date().toISOString()),
    };

    return NextResponse.json(transformedListing);
  } catch (error) {
    console.error("Error fetching listing:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
