"use client";

import { useAction } from "next-safe-action/hooks";
import { signOut } from "../api";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { toast } from "sonner";
import { LoadingButton } from "@/components/loading-button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const SignOutButton = () => {
  const { executeAsync, isPending } = useAction(signOut);
  const router = useRouter();

  const handleClick = async () => {
    const response = await executeAsync();

    if (response?.data?.success) {
      router.push(routes.signIn.root);
    } else {
      toast.error(response?.data?.message);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>Sign Out</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to sign out.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoadingButton
            onClick={handleClick}
            variant={"destructive"}
            isLoading={isPending}
          >
            Continue
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
