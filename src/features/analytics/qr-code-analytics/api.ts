"use server";

import {
  createErrorResponse,
  createSuccessResponse,
  isArrayEmpty,
} from "@/lib/utils";
import { requireAuth } from "../../auth/api";
import { db } from "@/db";
import { analyticsTable, qrCodeTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const getAnalyticsByQrCodeId = async (qrCodeId: number) => {
  try {
    const user = await requireAuth();

    const qrCodes = await db
      .select()
      .from(qrCodeTable)
      .where(
        and(eq(qrCodeTable.id, qrCodeId), eq(qrCodeTable.userId, user.id))
      );

    if (isArrayEmpty(qrCodes))
      return createErrorResponse("Could not find this QR Code.");

    const analytics = await db
      .select()
      .from(analyticsTable)
      .where(eq(analyticsTable.qrCodeId, qrCodes[0].id));

    return createSuccessResponse(analytics);
  } catch {
    return createErrorResponse(
      "Something went wrong while getting analytics for QR code."
    );
  }
};
