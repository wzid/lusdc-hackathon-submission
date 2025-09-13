"use server"

import { db } from "~/server/db";
import { items } from "~/server/db/schema";
import { env } from "~/env";

export async function publishListingServerAction({
  ownerId,
  typeId,
  title,
  description,
  pricePerDay,
  base64Images,
  location,
}: {
  ownerId: number;
  typeId: number;
  title: string;
  description: string;
  pricePerDay: number;
  base64Images: string[];
  location: string;
}) {
  // Upload images to external API
  type ImgBBResponse = {
    data: {
      url: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };

  const uploadedImageUrls: string[] = await Promise.all(
    base64Images.map(async (base64: string) => {
      const params = new URLSearchParams();
      params.append('key', env.IMGBB_API_KEY! as string);
      params.append('image', base64);
      const res = await fetch(env.IMAGE_UPLOAD_API! as string, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      const json = (await res.json()) as ImgBBResponse;
      console.log("Upload response:", json);
      return json.data.url;
    })
  );
  const pictureList = uploadedImageUrls.join(",");

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
