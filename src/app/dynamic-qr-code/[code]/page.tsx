"use server";

import { PageContainer } from "@/components/layout/page-container";
import { db } from "@/db";
import { QRCode, qrCodeTable } from "@/db/schema";
import { DynamicQRCode } from "@/features/qr-code/dynamic-qr-codes/containers/dynamic-qr-code";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

type Props = {
  params: {
    code: string;
  };
};

export async function generateMetadata({ params: { code } }: Props) {
  const codeNumber = parseInt(code);

  const response = await db
    .select()
    .from(qrCodeTable)
    .where(eq(qrCodeTable.code, codeNumber));

  const qrCode = response[0];

  return {
    title: qrCode.name,
  };
}

const CodePage = async ({ params: { code } }: Props) => {
  const codeNumber = parseInt(code);
  let qrCode: QRCode;

  try {
    const response = await db
      .select()
      .from(qrCodeTable)
      .where(eq(qrCodeTable.code, codeNumber));

    if (!response[0]) notFound();
    qrCode = response[0];
  } catch {
    notFound();
  }

  return (
    <PageContainer>
      <DynamicQRCode qrCode={qrCode} />
    </PageContainer>
  );
};

export default CodePage;
