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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, QrCode } from "lucide-react";

export function QrCodeGenerator() {
  const [qrData, setQrData] = useState("");
  const [activeTab, setActiveTab] = useState("url");
  const qrcodeRef = useRef<SVGSVGElement>(null);

  const handleInputChange = (value: string) => {
    setQrData(value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setQrData("");
  };

  const renderInputs = () => {
    switch (activeTab) {
      case "url":
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
      case "text":
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
      case "contact":
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
      case "message":
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
      case "email":
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

  const getQRCodeData = () => {
    switch (activeTab) {
      case "url":
        return qrData;
      case "text":
        return qrData;
      case "contact":
        const [name, phone, email] = qrData.split("\n");
        return `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
      case "message":
        const [messagePhone, message] = qrData.split("\n");
        return `SMSTO:${messagePhone}:${message}`;
      case "email":
        const [emailAddress, subject, body] = qrData.split("\n");
        return `mailto:${emailAddress}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
      default:
        return "";
    }
  };

  const downloadQRCode = () => {
    const svg = qrcodeRef.current!;
    const svgXML = new XMLSerializer().serializeToString(svg);
    const dataUrl = "data:image/svg," + encodeURIComponent(svgXML);

    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = `qr-code.svg`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
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
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="url">URL</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="message">Message</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab}>
            <div className="flex flex-col gap-4 mt-4">
              {renderInputs()}
              <div className="flex justify-center">
                {qrData ? (
                  <QRCodeSVG
                    ref={qrcodeRef}
                    value={getQRCodeData()}
                    size={200}
                    level="H"
                  />
                ) : (
                  <div className="w-[200px] h-[200px] border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-gray-300" />
                  </div>
                )}
              </div>
              <Button
                disabled={!qrData}
                className="flex gap-2"
                onClick={downloadQRCode}
              >
                <Download /> Download
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
