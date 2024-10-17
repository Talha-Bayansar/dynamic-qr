import { db } from "@/db";
import { qrCodeTable } from "@/db/schema";
import { routes } from "@/lib/routes";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

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
    redirect(routes.root);
  }
}
