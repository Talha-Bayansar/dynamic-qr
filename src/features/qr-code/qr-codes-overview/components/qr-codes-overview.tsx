"use server";

import { ErrorState } from "@/components/error-state";
import { getMyQRCodes } from "../api";
import { GridView } from "@/components/layout/grid-view";
import { generateArray, isArrayEmpty } from "@/lib/utils";
import { EmptyState } from "@/components/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { CreateQRCodeButton } from "../../create-qr-code/components/create-qr-code-button";
import { getQRCodeData } from "../../lib/utils";
import { QRType } from "../../models";

export const QRCodesOverview = async () => {
  const response = await getMyQRCodes();

  if (!response.success) return <ErrorState error={response.message!} />;

  if (isArrayEmpty(response.data))
    return (
      <EmptyState
        title="You didn't create any QR codes yet"
        description="Try creating your first dynamic QR code and start tracking."
        action={<CreateQRCodeButton />}
      />
    );

  return (
    <GridView>
      {response.data!.map((code) => (
        <Card key={code.name}>
          <CardHeader>
            <CardTitle>{code.name}</CardTitle>
            <CardDescription>
              QR Code value is:{" "}
              <a className="underline" href={code.value} target="_blank">
                {code.value}
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <QRCodeSVG
              className="w-full"
              value={getQRCodeData(code.value, code.type as QRType)}
            />
          </CardContent>
        </Card>
      ))}
      <CreateQRCodeButton />
    </GridView>
  );
};

export const QRCodesOverviewSkeleton = () => {
  return (
    <GridView>
      {generateArray(5).map((v) => (
        <Card key={v}>
          <CardHeader>
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-5" />
          </CardHeader>
          <CardContent>
            <QrCode className="text-muted w-full" size={128} />
          </CardContent>
        </Card>
      ))}
    </GridView>
  );
};
