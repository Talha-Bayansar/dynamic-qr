import { db } from "@/db";
import { analyticsTable, qrCodeTable } from "@/db/schema";
import { routes } from "@/lib/routes";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: number } }
) {
  console.log("req.ip", req.ip);
  console.log("req.geo", req.geo);
  console.log("req.headers.get('x-real-ip')", req.headers.get("x-real-ip"));
  console.log(
    "req.headers.get('x-forwarded-for')",
    req.headers.get("x-forwarded-for")
  );

  const data = {
    ip: req.ip,
    city: req.geo?.city,
    country: req.geo?.country,
    region: req.geo?.region,
    coordinates:
      req.geo?.latitude && req.geo?.longitude
        ? ([parseFloat(req.geo.latitude), parseFloat(req.geo.longitude)] as [
            number,
            number
          ])
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
