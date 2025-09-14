import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { bookings, items } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { itemId, startDate, endDate, totalPrice } = body;
  if (!itemId || !startDate || !endDate || !totalPrice) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }


  const itemIdNum = Number(itemId);
  // Type guard for date conversion

  // Convert startDate and endDate to JS Date objects
  let startDateObj, endDateObj;
  try {
    // Accept ISO string, UNIX timestamp, or JS Date
    startDateObj = typeof startDate === "string" || typeof startDate === "number"
      ? new Date(startDate)
      : startDate;
    endDateObj = typeof endDate === "string" || typeof endDate === "number"
      ? new Date(endDate)
      : endDate;
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      throw new Error("Invalid startDate or endDate");
    }
  } catch (err) {
    console.error("Date conversion error:", err);
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
  }

  // Debug insert values
  const bookingValues = {
    itemId: itemIdNum,
    renterId: String(session.user.id),
    startDate: startDateObj,
    endDate: endDateObj,
    totalPrice,
    status: "Awaiting Contact",
  };
  console.log("Booking insert values:", bookingValues);
  let booking;
  try {
    [booking] = await db
      .insert(bookings)
      .values(bookingValues)
      .returning();
    console.log("Booking insert result:", booking);
  } catch (err) {
    console.error("Booking insert error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
  return NextResponse.json({ bookingId: booking?.id });
}

export async function GET(request: Request) {
  // Get userId from query string or session
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }
  try {
    // Fetch bookings for this user and join item info
    const userBookings = await db
      .select({
        id: bookings.id,
        itemId: bookings.itemId,
        renterId: bookings.renterId,
        startDate: bookings.startDate,
        endDate: bookings.endDate,
        totalPrice: bookings.totalPrice,
        status: bookings.status,
        createdAt: bookings.createdAt,
        itemName: items.name,
        pictureList: items.pictureList
      })
      .from(bookings)
      .leftJoin(items, eq(bookings.itemId, items.id))
      .where(eq(bookings.renterId, userId));
    return NextResponse.json(userBookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

