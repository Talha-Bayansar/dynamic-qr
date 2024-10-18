"use server";

import { db } from "@/db";
import { qrCodeTable } from "@/db/schema";
import { requireAuth } from "@/features/auth/api";
import { createErrorResponse, createSuccessResponse } from "@/lib/utils";
import { eq } from "drizzle-orm";

export const getMyQRCodes = async () => {
  try {
    const user = await requireAuth();

    const qrCodes = await db
      .select()
      .from(qrCodeTable)
      .where(eq(qrCodeTable.userId, user.id));

    return createSuccessResponse(qrCodes);
  } catch (error) {
    return createErrorResponse("Something went wrong while getting QR Codes.");
  }
};
