import { db } from "@/db";
import { qrCodeTable } from "@/db/schema";
import { IPMetaData } from "@/features/ip-meta-data/models";
import { routes } from "@/lib/routes";
import { eq } from "drizzle-orm";
import { NextApiRequest } from "next";
import { redirect } from "next/navigation";
import requestIp from "request-ip";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { code: number } }
) {
  const clientIp = requestIp.getClientIp(req);
  console.log("clientIp", clientIp);
  if (clientIp) {
    const response = await fetch(ipApi(clientIp));
    const ipMetaData: IPMetaData = await response.json();

    console.log("meta data", ipMetaData);
  }

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

const ipApi = (ip: string) => `https://ipapi.co/${ip}/json/`;
