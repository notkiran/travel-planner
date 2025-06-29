"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

async function geocodeAddress(address: string) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error("Missing Google Maps API Key");
  }

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );

  const data = await response.json();
  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lng };
}

export default async function addLocation(formData: FormData, tripId: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Not Authunticated");
  }

  const address = formData.get("address")?.toString();

  if (!address) {
    throw new Error("Missing Address");
  }

  const { lat, lng } = await geocodeAddress(address);

  const count = await prisma.location.count({
    where: { tripId },
  });

  await prisma.location.create({
    data: {
      locationTitle: address,
      lat,
      lng,
      tripId,
      order: count,
    },
  });

  redirect(`/trips/${tripId}`);
}
