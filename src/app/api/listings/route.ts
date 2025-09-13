import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { items } from "~/server/db/schema";

export async function GET(request: Request) {
  // You can add query param parsing here for filters
  const listings = await db.select().from(items);
  return NextResponse.json(listings);
}
