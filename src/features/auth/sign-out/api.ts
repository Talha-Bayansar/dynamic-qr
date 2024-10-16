"use server";

import {
  deleteSessionTokenCookie,
  invalidateSession,
  validateRequest,
} from "@/auth/lucia";
import { safeAction } from "@/lib/safe-action";
import { createErrorResponse, createSuccessResponse } from "@/lib/utils";

export const signOut = safeAction.action(async () => {
  const { session } = await validateRequest();
  if (!session) {
    return createErrorResponse("Could not sign out.");
  }

  await invalidateSession(session.id);

  deleteSessionTokenCookie();
  return createSuccessResponse();
});
