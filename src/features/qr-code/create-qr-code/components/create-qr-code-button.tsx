"use client";

import { AddButton } from "@/components/add-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateQRCodeForm } from "./create-qr-code-form";
import { useState } from "react";

export const CreateQRCodeButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <AddButton>Create QR Code</AddButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create QR Code</DialogTitle>
        </DialogHeader>
        <CreateQRCodeForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
