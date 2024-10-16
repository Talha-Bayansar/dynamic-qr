"use server";

import { db } from "@/db";
import { qrCodeTable } from "@/db/schema";
import { requireAuth } from "@/features/auth/api";
import { SubscriptionPlan } from "@/features/subscription/models";
import { routes } from "@/lib/routes";
import { safeAction } from "@/lib/safe-action";
import { createErrorResponse, createSuccessResponse } from "@/lib/utils";
import { count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createQRCodeSchema = z.object({
  name: z.string().min(1).max(255),
  value: z.string().min(1).max(255),
});

export const createQRCode = safeAction
  .schema(createQRCodeSchema)
  .action(async ({ parsedInput: { name, value } }) => {
    try {
      const user = await requireAuth();

      if (!user.planName || user.planName === SubscriptionPlan.FREE) {
        return createErrorResponse(
          "You're currently on a free plan. Please upgrade to create dynamic QR codes."
        );
      }

      const qrCodesCount = await db
        .select({ count: count() })
        .from(qrCodeTable)
        .where(eq(qrCodeTable.userId, user.id));

      if (
        user.planName === SubscriptionPlan.BASIC &&
        qrCodesCount?.[0].count >= 5
      ) {
        return createErrorResponse(
          "You have reached your limit of 5 dynamic QR codes on the Basic plan. Please upgrade to create more."
        );
      }

      if (
        user.planName === SubscriptionPlan.PRO &&
        qrCodesCount?.[0].count >= 20
      ) {
        return createErrorResponse(
          "You have reached your limit of 20 dynamic QR codes on the Pro plan."
        );
      }

      await db.insert(qrCodeTable).values({
        name,
        value,
        userId: user.id,
      });

      revalidatePath(routes.dashboard.dynamicQRCodes.root);

      return createSuccessResponse();
    } catch (error) {
      return createErrorResponse(
        "Something went wrong while creating QR Code."
      );
    }
  });
