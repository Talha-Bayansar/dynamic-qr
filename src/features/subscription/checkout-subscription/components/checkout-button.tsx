"use client";

import { LoadingButton } from "@/components/loading-button";
import { useAction } from "next-safe-action/hooks";
import { checkoutAction } from "../../api";

type Props = {
  priceId: string;
  children: React.ReactNode;
};

export const CheckoutButton = ({ priceId, children }: Props) => {
  const { executeAsync, isPending } = useAction(checkoutAction);

  const handleClick = async () => {
    await executeAsync({ priceId });
  };

  return (
    <LoadingButton onClick={handleClick} isLoading={isPending}>
      {children}
    </LoadingButton>
  );
};
