"use client";

import { useAction } from "next-safe-action/hooks";
import { customerPortalAction } from "../../api";
import { LoadingButton } from "@/components/loading-button";

export const ManageSubscriptionButton = () => {
  const { executeAsync, isPending } = useAction(customerPortalAction);

  const handleClick = async () => {
    await executeAsync();
  };

  return (
    <LoadingButton
      onClick={handleClick}
      type="submit"
      variant="outline"
      isLoading={isPending}
    >
      Manage Subscription
    </LoadingButton>
  );
};
