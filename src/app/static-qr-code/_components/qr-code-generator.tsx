"use client";

import { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import { Download, QrCode } from "lucide-react";
import { DownloadQRCodeButton } from "@/features/qr-code/components/download-qr-code-button";
import { getQRCodeData } from "@/features/qr-code/lib/utils";
import { QRType } from "@/features/qr-code/models";
import { EmailInput } from "@/features/qr-code/components/email-input";
import { MessageInput } from "@/features/qr-code/components/message-input";
import { TextInput } from "@/features/qr-code/components/text-input";
import { UrlInput } from "@/features/qr-code/components/url-input";
import { VCardInput } from "@/features/qr-code/components/vcard-input";

export function QrCodeGenerator() {
  const [qrData, setQrData] = useState("");
  const [activeTab, setActiveTab] = useState(QRType.URL);
  const qrcodeRef = useRef<SVGSVGElement>(null);

  const handleInputChange = (value: string) => {
    setQrData(value);
  };

  const handleTabChange = (value: QRType) => {
    setActiveTab(value);
    setQrData("");
  };

  const renderInputs = () => {
    switch (activeTab) {
      case QRType.URL:
        return <UrlInput value={qrData} onChange={handleInputChange} />;
      case QRType.TEXT:
        return <TextInput value={qrData} onChange={handleInputChange} />;
      case QRType.VCARD:
        return <VCardInput value={qrData} onChange={handleInputChange} />;
      case QRType.MESSAGE:
        return <MessageInput value={qrData} onChange={handleInputChange} />;
      case QRType.EMAIL:
        return <EmailInput value={qrData} onChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>QR Code Generator</CardTitle>
        <CardDescription>
          Generate QR codes for various purposes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(v) => handleTabChange(v as QRType)}
        >
          <TabsList className="grid w-full grid-cols-5">
            {Object.values(QRType).map((qrType) => (
              <TabsTrigger className="capitalize" key={qrType} value={qrType}>
                {["url", "vcard"].includes(qrType)
                  ? qrType.toUpperCase()
                  : qrType}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={activeTab}>
            <div className="flex flex-col gap-4 mt-4">
              {renderInputs()}
              <div className="flex justify-center">
                {qrData ? (
                  <QRCodeSVG
                    ref={qrcodeRef}
                    value={getQRCodeData(qrData, activeTab)}
                    size={200}
                    level="H"
                  />
                ) : (
                  <div className="w-[200px] h-[200px] border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-gray-300" />
                  </div>
                )}
              </div>
              <DownloadQRCodeButton
                className="flex gap-2"
                disabled={!qrData}
                qrCodeRef={qrcodeRef}
              >
                <Download /> Download
              </DownloadQRCodeButton>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
