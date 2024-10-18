import { db } from "@/db";
import { qrCodeTable } from "@/db/schema";
import { routes } from "@/lib/routes";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: number } }
) {
  const code = params.code;

  const qrCodes = await db
    .select()
    .from(qrCodeTable)
    .where(eq(qrCodeTable.code, code));

  const qrCode = qrCodes[0];

  if (qrCode) {
    redirect(routes.dynamicQRCode.code(qrCode.code).root);
  }
}
