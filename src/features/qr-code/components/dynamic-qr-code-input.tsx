"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QRType } from "../models";
import { UrlInput } from "./url-input";
import { TextInput } from "./text-input";
import { VCardInput } from "./vcard-input";
import { MessageInput } from "./message-input";
import { EmailInput } from "./email-input";

type Props = {
  onChange?: (value: string, type: QRType) => void;
  type?: QRType;
  value?: string;
};

export function DynamicQRCodeInput({
  onChange,
  type = QRType.URL,
  value = "",
}: Props) {
  const [qrData, setQrData] = useState(value);
  const [activeTab, setActiveTab] = useState(type);

  const handleInputChange = (value: string) => {
    setQrData(value);
    onChange?.(value, activeTab);
  };

  const handleTabChange = (value: QRType) => {
    setActiveTab(value);
    setQrData("");
    onChange?.("", value);
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
        return <MessageInput value={value} onChange={handleInputChange} />;
      case QRType.EMAIL:
        return <EmailInput value={value} onChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Dynamic QR Code</CardTitle>
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
          <TabsContent className="mt-4" value={activeTab.toString()}>
            {renderInputs()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
