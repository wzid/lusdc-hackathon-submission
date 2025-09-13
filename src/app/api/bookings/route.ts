import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { bookings } from "~/server/db/schema";
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

  console.log("HELLLLOOOO")

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
    status: "pending",
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
  // Optionally: implement fetching bookings for a user or by ID
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
