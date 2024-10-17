"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useState } from "react";
import { QRCode } from "@/db/schema";
import { UpdateQRCodeForm } from "./update-qr-code-form";

type Props = {
  qrCode: QRCode;
};

export const EditQRCodeButton = ({ qrCode }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Edit "${qrCode.name}" QR Code`}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit QR Code</DialogTitle>
        </DialogHeader>
        <UpdateQRCodeForm qrCode={qrCode} onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
