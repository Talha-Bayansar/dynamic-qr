"use server";

import { db } from "@/db";
import { qrCodeTable } from "@/db/schema";
import { requireAuth } from "@/features/auth/api";
import { SubscriptionPlan } from "@/features/subscription/models";
import { routes } from "@/lib/routes";
import { safeAction } from "@/lib/safe-action";
import { createErrorResponse, createSuccessResponse } from "@/lib/utils";
import { and, count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { DynamicQRType } from "../models";

const updateQRCodeSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(255),
  value: z.string().min(1),
  type: z.nativeEnum(DynamicQRType),
});

export const updateQRCode = safeAction
  .schema(updateQRCodeSchema)
  .action(async ({ parsedInput: { id, name, value, type } }) => {
    try {
      const user = await requireAuth();

      if (!user.planName || user.planName === SubscriptionPlan.FREE) {
        return createErrorResponse(
          "You're currently on a free plan. Please upgrade to edit dynamic QR codes."
        );
      }

      const qrCodesCount = await db
        .select({ count: count() })
        .from(qrCodeTable)
        .where(eq(qrCodeTable.userId, user.id));

      if (
        user.planName === SubscriptionPlan.BASIC &&
        qrCodesCount?.[0].count >= 6
      ) {
        return createErrorResponse(
          "You have exceeded your limit of 5 dynamic QR codes on the Basic plan. Please upgrade to edit more or remove existing QR codes."
        );
      }

      if (
        user.planName === SubscriptionPlan.PRO &&
        qrCodesCount?.[0].count > 20
      ) {
        return createErrorResponse(
          "You have exceeded your limit of 20 dynamic QR codes on the Pro plan. Please remove existing QR codes and try again."
        );
      }

      const response = await db
        .update(qrCodeTable)
        .set({
          name,
          value: JSON.parse(value),
          type,
          userId: user.id,
        })
        .where(and(eq(qrCodeTable.id, id), eq(qrCodeTable.userId, user.id)));

      revalidatePath(routes.dashboard.dynamicQRCodes.root);
      revalidatePath(routes.dashboard.root);

      return createSuccessResponse(response);
    } catch (error) {
      return createErrorResponse("Something went wrong while editing QR Code.");
    }
  });
