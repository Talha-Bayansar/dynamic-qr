"use client";

import { Button } from "@/components/ui/button";
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
import { QRCode } from "@/db/schema";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { LoadingButton } from "@/components/loading-button";
import { useAction } from "next-safe-action/hooks";
import { deleteQRCodeById } from "../api";
import { toast } from "sonner";

type Props = {
  qrCode: QRCode;
};

export const DeleteQRCodeButton = ({ qrCode }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { executeAsync, isPending } = useAction(deleteQRCodeById);

  const handleDelete = async () => {
    const response = await executeAsync({ id: qrCode.id });

    if (response?.data?.success) {
      setIsOpen(false);
      toast.success("QR Code deleted");
    } else {
      toast.error(response?.data?.message);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Delete "${qrCode.name}" QR Code`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete &quot;{qrCode.name}&quot; QR Code?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action can not be reverted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoadingButton onClick={handleDelete} isLoading={isPending}>
            Continue
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
