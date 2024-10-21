import { db } from "@/db";
import { analyticsTable, qrCodeTable } from "@/db/schema";
import { routes } from "@/lib/routes";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { code: number };
  }
) {
  const ip = req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for");
  const country = req.nextUrl.searchParams.get("country");
  const city = req.nextUrl.searchParams.get("city");
  const region = req.nextUrl.searchParams.get("region");
  const latitude = req.nextUrl.searchParams.get("latitude");
  const longitude = req.nextUrl.searchParams.get("longitude");

  const data = {
    ip: ip,
    city: city,
    country: country,
    region: region,
    coordinates:
      latitude && longitude
        ? ([parseFloat(latitude), parseFloat(longitude)] as [number, number])
        : undefined,
  };

  const code = params.code;

  const qrCodes = await db
    .select()
    .from(qrCodeTable)
    .where(eq(qrCodeTable.code, code));

  const qrCode = qrCodes[0];

  if (qrCode) {
    await db.insert(analyticsTable).values({
      qrCodeId: qrCode.id,
      ...data,
    });
    redirect(routes.dynamicQRCode.code(qrCode.code).root);
  } else {
    notFound();
  }
}
