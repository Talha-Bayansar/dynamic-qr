import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { QRCode } from "@/db/schema";
import { QRCodeSVG } from "qrcode.react";
import { getQRCodeData } from "../../lib/utils";
import { QRType } from "../../models";

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
    </Card>
  );
};
