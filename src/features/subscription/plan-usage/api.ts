"use server";

import { requireAuth } from "@/features/auth/api";
import { SubscriptionPlan } from "../models";
import { db } from "@/db";
import { count, eq } from "drizzle-orm";
import { qrCodeTable } from "@/db/schema";
import { createErrorResponse, createSuccessResponse } from "@/lib/utils";

export const getPlanUsage = async () => {
  try {
    const user = await requireAuth();

    const plan = user.planName ?? SubscriptionPlan.FREE;
    let limit = 0;

    if (plan === SubscriptionPlan.BASIC) limit = 5;
    if (plan === SubscriptionPlan.PRO) limit = 20;

    const currentUsage = await db
      .select({ count: count() })
      .from(qrCodeTable)
      .where(eq(qrCodeTable.userId, user.id));

    const data = {
      plan: plan,
      limit: limit,
      usage: currentUsage?.[0].count ?? 0,
    };

    return createSuccessResponse(data);
  } catch (error) {
    return createErrorResponse("Couldn't get plan usage.");
  }
};
