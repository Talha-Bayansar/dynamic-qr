"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamicQRType } from "../models";
import { UrlInput } from "./url-input";
import { TextInput } from "./text-input";
import { VCardPlusInput } from "./vcard-plus-input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UrlListInput } from "./url-list-input";

type Props = {
  onChange?: (value: string, type: DynamicQRType) => void;
  type?: DynamicQRType;
  value?: string;
};

export function DynamicQRCodeInput({
  onChange,
  type = DynamicQRType.URL_LIST,
  value = "",
}: Props) {
  const [qrData, setQrData] = useState(value);
  const [activeTab, setActiveTab] = useState(type);

  const handleInputChange = (value: string) => {
    setQrData(value);
    onChange?.(value, activeTab);
  };

  const handleTabChange = (value: DynamicQRType) => {
    setActiveTab(value);
    setQrData("");
    onChange?.("", value);
  };

  const renderInputs = () => {
    switch (activeTab) {
      case DynamicQRType.URL_LIST:
        return <UrlListInput value={qrData} onChange={handleInputChange} />;
      case DynamicQRType.VCARD_PLUS:
        return <VCardPlusInput value={qrData} onChange={handleInputChange} />;
      case DynamicQRType.DOCUMENTS:
        return <TextInput value={qrData} onChange={handleInputChange} />;
      case DynamicQRType.GALLERY:
        return <TextInput value={qrData} onChange={handleInputChange} />;
      case DynamicQRType.PDF:
        return <TextInput value={qrData} onChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dynamic QR Code</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(v) => handleTabChange(v as DynamicQRType)}
        >
          <ScrollArea>
            <TabsList>
              {Object.values(DynamicQRType).map((qrType) => (
                <TabsTrigger className="capitalize" key={qrType} value={qrType}>
                  {qrType.replaceAll("-", " ").toUpperCase()}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <TabsContent className="mt-4" value={activeTab.toString()}>
            {renderInputs()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
