import NewLocationClient from "@/components/new-location";

export default async function NewLocation({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  console.log(tripId);
  return <NewLocationClient tripId={tripId} />;
}
