"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { QRCode } from "@/db/schema";
import { QRCodeSVG } from "qrcode.react";
import { DeleteQRCodeButton } from "../../delete-qr-code/components/delete-qr-code-button";
import { EditQRCodeButton } from "../../update-qr-code/components/edit-qr-code-button";
import { DownloadQRCodeButton } from "../../components/download-qr-code-button";
import { useRef } from "react";
import { Download } from "lucide-react";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { PreviewButton } from "./preview-button";

type Props = {
  qrCode: QRCode;
  origin: string;
};

export const QRCodeCard = ({ qrCode, origin }: Props) => {
  const qrCodeRef = useRef<SVGSVGElement>(null);

  return (
    <Card key={qrCode.name}>
      <CardHeader>
        <CardTitle>{qrCode.name}</CardTitle>
        <CardDescription>
          Type of <span className="uppercase font-bold">{qrCode.type}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={routes.dashboard.dynamicQRCodes.id(qrCode.id).root}>
          <QRCodeSVG
            ref={qrCodeRef}
            className="w-full hover:opacity-75"
            value={`${origin}${routes.api.qrCode.code(qrCode.code).root}`}
          />
        </Link>
      </CardContent>
      <CardFooter className="justify-end">
        <PreviewButton qrCode={qrCode} />
        <DownloadQRCodeButton
          variant={"ghost"}
          size={"icon"}
          qrCodeRef={qrCodeRef}
        >
          <Download className="h-4 w-4" />
        </DownloadQRCodeButton>
        <EditQRCodeButton qrCode={qrCode} />
        <DeleteQRCodeButton qrCode={qrCode} />
      </CardFooter>
    </Card>
  );
};
