"use server";

import { db } from "@/db";
import { qrCodeTable } from "@/db/schema";
import { requireAuth } from "@/features/auth/api";
import { routes } from "@/lib/routes";
import { safeAction } from "@/lib/safe-action";
import { createErrorResponse, createSuccessResponse } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const deleteQRCodeSchema = z.object({
  id: z.number(),
});

export const deleteQRCodeById = safeAction
  .schema(deleteQRCodeSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      const user = await requireAuth();

      const response = await db
        .delete(qrCodeTable)
        .where(and(eq(qrCodeTable.id, id), eq(qrCodeTable.userId, user.id)));

      revalidatePath(routes.dashboard.root);
      revalidatePath(routes.dashboard.dynamicQRCodes.root);

      return createSuccessResponse(response);
    } catch (error) {
      return createErrorResponse(
        "Something went wrong while deleting QR code."
      );
    }
  });
