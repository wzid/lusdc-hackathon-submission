import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { items } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
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

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error fetching listing:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
