import { db } from "@/db";
import { qrCodeTable } from "@/db/schema";
import { getQRCodeData } from "@/features/qr-code/lib/utils";
import { QRType } from "@/features/qr-code/models";
import { eq } from "drizzle-orm";

export async function GET(
  _: Request,
  { params }: { params: { code: number } }
) {
  const code = params.code;

  const response = await db
    .select()
    .from(qrCodeTable)
    .where(eq(qrCodeTable.code, code));

  if (response[0]) {
    return new Response(
      getQRCodeData(response[0].value, response[0].type as QRType)
    );
  }
}
