"use server";

import { validateRequest } from "@/auth/lucia";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { routes } from "@/lib/routes";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const requireAuth = async () => {
  const user = await getUser();
  if (!user) {
    redirect(routes.signIn.root);
  }

  return user;
};

export const getUser = async () => {
  const response = await validateRequest();

  return response.user;
};

export async function getUserByStripeCustomerId(customerId: string) {
  const result = await db
    .select()
    .from(userTable)
    .where(eq(userTable.stripeCustomerId, customerId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateUserSubscription(subscriptionData: {
  stripeSubscriptionId: string | null;
  stripeProductId: string | null;
  planName: string | null;
  subscriptionStatus: string;
}) {
  const user = await requireAuth();

  await db
    .update(userTable)
    .set({
      ...subscriptionData,
    })
    .where(eq(userTable.id, user.id));
}
