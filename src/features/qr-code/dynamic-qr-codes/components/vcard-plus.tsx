"use client";

import { Button } from "@/components/ui/button";
import { QRCode } from "@/db/schema";
import { Globe, LucideIcon, Mail, MapPin, Phone, UserPlus } from "lucide-react";
import * as types from "../../models";
import { Main } from "@/components/layout/main";
import { View } from "@/components/layout/view";

type Props = {
  qrCode: QRCode;
};

type Info = {
  value: string;
  Icon: LucideIcon;
  isWebsite?: boolean;
  isPhoneNumber?: boolean;
  isEmail?: boolean;
};

export const VCardPlus = ({ qrCode }: Props) => {
  const data = qrCode.value as types.VCardPlus;

  const infoLines: Info[] = [
    {
      value: data.phone,
      Icon: Phone,
      isPhoneNumber: true,
    },
    {
      value: data.email,
      Icon: Mail,
      isEmail: true,
    },
    {
      value: data.website,
      Icon: Globe,
      isWebsite: true,
    },
    {
      value: data.address,
      Icon: MapPin,
    },
  ];

  const generateVCard = () => {
    const vCardData = `
  BEGIN:VCARD
  VERSION:3.0
  FN:${data.name}
  EMAIL:${data.email}
  TEL:${data.phone}
  ADR:${data.address}
  URL:${data.website}
  END:VCARD
  `;
    return vCardData;
  };

  const addContactNewTab = () => {
    const vCardData = generateVCard();
    const vCardUrl = `data:text/vcard;charset=utf-8,${encodeURIComponent(
      vCardData
    )}`;

    const a = document.createElement("a");
    a.href = vCardUrl;
    a.download = `${data.name}.vcf`;
    a.target = "_blank"; // Open in a new tab
    a.click();
  };

  const addContactBlob = () => {
    const vCardData = generateVCard();
    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `${data.name}.vcf`;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url); // Clean up the URL object
    document.body.removeChild(a); // Clean up the anchor element
  };

  const addContactMail = () => {
    const vCardData = generateVCard();
    const mailtoLink = `mailto:?subject=Contact&body=${encodeURIComponent(
      vCardData
    )}`;

    window.location.href = mailtoLink; // Opens email app to add contact
  };

  const addContactHref = () => {
    const vCardData = generateVCard();
    const vCardUrl = `data:text/vcard;charset=utf-8,${encodeURIComponent(
      vCardData
    )}`;

    window.location.href = vCardUrl;
  };

  return (
    <Main className="w-full justify-center md:items-center">
      <View className="max-w-md gap-8">
        <h1 className="text-2xl font-bold text-center">{data.name}</h1>
        <div className="space-y-4">
          {infoLines.map((line) => (
            <InfoLine key={line.value} data={line} />
          ))}
        </div>
      </View>
      <Button
        className="fixed bottom-8 right-8 rounded-full w-16 h-16 shadow-lg"
        size="icon"
        onClick={addContactNewTab}
      >
        <UserPlus className="h-6 w-6" />
        <span className="sr-only">Add Contact</span>
      </Button>
      <Button
        className="fixed top-8 right-8 rounded-full w-16 h-16 shadow-lg"
        size="icon"
        onClick={addContactBlob}
      >
        <UserPlus className="h-6 w-6" />
        <span className="sr-only">Add Contact</span>
      </Button>
      <Button
        className="fixed top-8 left-8 rounded-full w-16 h-16 shadow-lg"
        size="icon"
        onClick={addContactMail}
      >
        <UserPlus className="h-6 w-6" />
        <span className="sr-only">Add Contact</span>
      </Button>
      <Button
        className="fixed bottom-8 left-8 rounded-full w-16 h-16 shadow-lg"
        size="icon"
        onClick={addContactHref}
      >
        <UserPlus className="h-6 w-6" />
        <span className="sr-only">Add Contact</span>
      </Button>
    </Main>
  );
};

const InfoLine = ({ data }: { data: Info }) => {
  const {
    value,
    Icon,
    isWebsite = false,
    isEmail = false,
    isPhoneNumber = false,
  } = data;

  return (
    <div className="flex items-center space-x-2">
      <Icon className="text-muted-foreground shrink-0" />

      <span className="overflow-hidden text-wrap whitespace-nowrap text-ellipsis">
        {isWebsite ? (
          <a href={value} target="__blank" className="underline">
            {value}
          </a>
        ) : isEmail ? (
          <a href={`mailto:${value}`} className="underline">
            {value}
          </a>
        ) : isPhoneNumber ? (
          <a href={`tel:${value}`} className="underline">
            {value}
          </a>
        ) : (
          value
        )}
      </span>
    </div>
  );
};
