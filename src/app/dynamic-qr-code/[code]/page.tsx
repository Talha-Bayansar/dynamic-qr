"use server";

import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { PageContainer } from "@/components/layout/page-container";
import { View } from "@/components/layout/view";
import { db } from "@/db";
import { QRCode, qrCodeTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

type Props = {
  params: {
    code: string;
  };
};

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
      <Main>
        <Header title="Dynamic QR Code" />
        <View>{qrCode.value}</View>
      </Main>
    </PageContainer>
  );
};

export default CodePage;
