import { Button } from "@/components/ui/button";
import { QRCode } from "@/db/schema";
import { routes } from "@/lib/routes";
import { Eye } from "lucide-react";
import Link from "next/link";

type Props = {
  qrCode: QRCode;
};

export const PreviewButton = ({ qrCode }: Props) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Preview "${qrCode.name}" QR Code`}
      asChild
    >
      <Link href={routes.dynamicQRCode.code(qrCode.code).root}>
        <Eye className="h-4 w-4" />
      </Link>
    </Button>
  );
};
