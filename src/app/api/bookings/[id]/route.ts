
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { bookings, items, users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const awaitedParams = await params;
  const bookingId = Number(awaitedParams.id);
  if (!bookingId) {
    return NextResponse.json({ error: "Invalid booking ID" }, { status: 400 });
  }

  // Fetch booking
  const bookingArr = await db.select().from(bookings).where(eq(bookings.id, bookingId));
  const booking = bookingArr[0];
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  // Fetch item
  const itemArr = await db.select().from(items).where(eq(items.id, booking.itemId));
  const item = itemArr[0];

  // Fetch owner
  let owner = null;
  if (item?.ownerId) {
  const ownerArr = await db.select().from(users).where(eq(users.id, item.ownerId));
  owner = ownerArr[0] ?? null;
  }

  // Ensure startDate and endDate are returned as UNIX timestamps (number)
  let startDateNum = booking?.startDate instanceof Date ? Math.floor(booking.startDate.getTime() / 1000) : Number(booking?.startDate);
  let endDateNum = booking?.endDate instanceof Date ? Math.floor(booking.endDate.getTime() / 1000) : Number(booking?.endDate);
  return NextResponse.json({
    ...booking,
    startDate: startDateNum,
    endDate: endDateNum,
    item,
    owner,
  });
}
