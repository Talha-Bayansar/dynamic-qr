"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QRType } from "../models";

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
        return (
          <div className="flex gap-2 flex-col">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              placeholder="https://example.com"
              value={qrData}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          </div>
        );
      case QRType.TEXT:
        return (
          <div className="flex gap-2 flex-col">
            <Label htmlFor="text">Text</Label>
            <Textarea
              id="text"
              placeholder="Enter your text here"
              value={qrData}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          </div>
        );
      case QRType.CONTACT:
        return (
          <div className="flex gap-4 flex-col">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={qrData.split("\n")[0] || ""}
                onChange={(e) =>
                  handleInputChange(
                    `${e.target.value}\n${qrData.split("\n")[1] || ""}\n${
                      qrData.split("\n")[2] || ""
                    }`
                  )
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="+1234567890"
                value={qrData.split("\n")[1] || ""}
                onChange={(e) =>
                  handleInputChange(
                    `${qrData.split("\n")[0] || ""}\n${e.target.value}\n${
                      qrData.split("\n")[2] || ""
                    }`
                  )
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="johndoe@example.com"
                value={qrData.split("\n")[2] || ""}
                onChange={(e) =>
                  handleInputChange(
                    `${qrData.split("\n")[0] || ""}\n${
                      qrData.split("\n")[1] || ""
                    }\n${e.target.value}`
                  )
                }
              />
            </div>
          </div>
        );
      case QRType.MESSAGE:
        return (
          <div className="flex gap-4 flex-col">
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1234567890"
                value={qrData.split("\n")[0] || ""}
                onChange={(e) =>
                  handleInputChange(
                    `${e.target.value}\n${qrData.split("\n")[1] || ""}`
                  )
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message here"
                value={qrData.split("\n")[1] || ""}
                onChange={(e) =>
                  handleInputChange(
                    `${qrData.split("\n")[0] || ""}\n${e.target.value}`
                  )
                }
              />
            </div>
          </div>
        );
      case QRType.EMAIL:
        return (
          <div className="flex gap-4 flex-col">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="johndoe@example.com"
                value={qrData.split("\n")[0] || ""}
                onChange={(e) =>
                  handleInputChange(
                    `${e.target.value}\n${qrData.split("\n")[1] || ""}\n${
                      qrData.split("\n")[2] || ""
                    }`
                  )
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Email subject"
                value={qrData.split("\n")[1] || ""}
                onChange={(e) =>
                  handleInputChange(
                    `${qrData.split("\n")[0] || ""}\n${e.target.value}\n${
                      qrData.split("\n")[2] || ""
                    }`
                  )
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="body">Body</Label>
              <Textarea
                id="body"
                placeholder="Email body"
                value={qrData.split("\n")[2] || ""}
                onChange={(e) =>
                  handleInputChange(
                    `${qrData.split("\n")[0] || ""}\n${
                      qrData.split("\n")[1] || ""
                    }\n${e.target.value}`
                  )
                }
              />
            </div>
          </div>
        );
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
            <TabsTrigger value={QRType.URL}>URL</TabsTrigger>
            <TabsTrigger value={QRType.TEXT}>Text</TabsTrigger>
            <TabsTrigger value={QRType.CONTACT}>Contact</TabsTrigger>
            <TabsTrigger value={QRType.MESSAGE}>Message</TabsTrigger>
            <TabsTrigger value={QRType.EMAIL}>Email</TabsTrigger>
          </TabsList>
          <TabsContent className="mt-4" value={activeTab.toString()}>
            {renderInputs()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
