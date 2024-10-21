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

  const country = req.headers.get("country");
  const city = req.headers.get("city");
  const region = req.headers.get("region");
  const latitude = req.headers.get("latitude");
  const longitude = req.headers.get("longitude");

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
