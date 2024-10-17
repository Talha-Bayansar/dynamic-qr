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
import { getQRCodeData } from "../../lib/utils";
import { QRType } from "../../models";
import { DeleteQRCodeButton } from "../../delete-qr-code/components/delete-qr-code-button";
import { EditQRCodeButton } from "../../update-qr-code/components/edit-qr-code-button";

type Props = {
  qrCode: QRCode;
};

export const QRCodeCard = ({ qrCode }: Props) => {
  return (
    <Card key={qrCode.name}>
      <CardHeader>
        <CardTitle>{qrCode.name}</CardTitle>
        <CardDescription>
          Type of <span className="uppercase font-bold">{qrCode.type}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <QRCodeSVG
          className="w-full"
          value={getQRCodeData(qrCode.value, qrCode.type as QRType)}
        />
      </CardContent>
      <CardFooter>
        <EditQRCodeButton qrCode={qrCode} />
        <DeleteQRCodeButton qrCode={qrCode} />
      </CardFooter>
    </Card>
  );
};
