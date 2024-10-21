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
import { DynamicQRType } from "../models";

const createQRCodeSchema = z.object({
  name: z.string().min(1).max(255),
  value: z.string().min(1),
  type: z.nativeEnum(DynamicQRType),
});

export const createQRCode = safeAction
  .schema(createQRCodeSchema)
  .action(async ({ parsedInput: { name, value, type } }) => {
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

      const response = await db.insert(qrCodeTable).values({
        name,
        value: JSON.parse(value),
        type,
        userId: user.id,
      });

      revalidatePath(routes.dashboard.dynamicQRCodes.root);
      revalidatePath(routes.dashboard.root);

      return createSuccessResponse(response);
    } catch (error) {
      return createErrorResponse(
        "Something went wrong while creating QR Code."
      );
    }
  });
