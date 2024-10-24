"use client";

import { Button } from "@/components/ui/button";
import { QRCode } from "@/db/schema";
import { Globe, LucideIcon, Mail, MapPin, Phone, UserPlus } from "lucide-react";
import * as types from "../../models";
import { Main } from "@/components/layout/main";
import { View } from "@/components/layout/view";
import VCard from "vcard-creator";

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
      value: `${data.street}, ${data.city} ${data.zip}, ${data.country}`,
      Icon: MapPin,
    },
  ];

  const generateVCard = () => {
    const vCard = new VCard();
    vCard
      // Add personal data
      .addName(data.name)
      .addEmail(data.email)
      .addPhoneNumber(data.phone)
      .addAddress(
        undefined,
        undefined,
        data.street,
        data.city,
        undefined,
        data.zip,
        data.country
      )
      .addURL(data.website);
    return vCard.toString();
  };

  const addContact = () => {
    const vCardData = generateVCard();
    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.name}.vcf`;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url); // Clean up the URL object
    document.body.removeChild(a); // Clean up the anchor element
  };

  return (
    <Main className="w-full justify-center md:items-center">
      <View className="max-w-md gap-8">
        <h1 className="text-2xl font-bold text-center">{data.name}</h1>
        <div className="space-y-4">
          {infoLines.map((line, i) => (
            <InfoLine key={i} data={line} />
          ))}
        </div>
      </View>
      <Button
        className="fixed bottom-8 right-8 rounded-full w-16 h-16 shadow-lg"
        size="icon"
        onClick={addContact}
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
