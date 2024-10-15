"use server";

import { redirect } from "next/navigation";
import {
  createCheckoutSession,
  createCustomerPortalSession,
} from "../../stripe";
import { z } from "zod";
import { safeAction } from "@/lib/safe-action";
import { routes } from "@/lib/routes";

const checkoutSchema = z.object({
  priceId: z.string().min(1),
});

export const checkoutAction = safeAction
  .schema(checkoutSchema)
  .action(async ({ parsedInput: { priceId } }) => {
    await createCheckoutSession({ priceId });
  });

export const customerPortalAction = safeAction.action(async () => {
  const portalSession = await createCustomerPortalSession();
  redirect(portalSession.url ?? `${routes.root}#pricing`);
});
