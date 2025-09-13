"use server"

import { db } from "~/server/db";
import { items } from "~/server/db/schema";
import { env } from "~/env";
import { getServerAuthSession } from "~/lib/auth";

export async function publishListingServerAction(
  {
    typeId,
    title,
    description,
    pricePerDay,
    base64Image,
    location,
  }: {
    typeId: number;
    title: string;
    description: string;
    pricePerDay: number;
    base64Image: string;
    location: string;
  }
) {
  // Get user session and ownerId
  const session = await getServerAuthSession();
  const ownerId = (session?.user as { id: string })?.id;
  console.log("Owner ID:", ownerId);
  console.log("TypeId:", typeId);
  if (!ownerId) throw new Error("User not authenticated");
  // Upload images to external API
  type ImgBBResponse = {
    data: {
      url: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };

  // Upload single image
  const params = new URLSearchParams();
  params.append('key', env.IMGBB_API_KEY);
  params.append('image', base64Image);
  const res = await fetch(env.IMAGE_UPLOAD_API, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  const json = (await res.json()) as ImgBBResponse;
  console.log("Upload response:", json);
  const pictureList = json.data.url;

  console.log("Image URL:", pictureList);
  await db.insert(items).values({
    ownerId,
    typeId,
    name: title,
    description,
    pricePerHour: 0,
    pricePerDay,
    pictureList,
    location,
  });
}
