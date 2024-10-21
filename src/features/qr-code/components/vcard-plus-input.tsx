"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VCardPlus } from "../models";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const VCardPlusInput = ({ value, onChange }: Props) => {
  const data: VCardPlus = value
    ? JSON.parse(value)
    : {
        name: "",
        phone: "",
        email: "",
        website: "",
        address: "",
      };

  return (
    <div className="flex gap-4 flex-col">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          value={data.name || ""}
          onChange={(e) =>
            onChange(
              JSON.stringify({
                ...data,
                name: e.target.value,
              })
            )
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          placeholder="+1234567890"
          type="tel"
          inputMode="tel"
          value={data.phone || ""}
          onChange={(e) =>
            onChange(
              JSON.stringify({
                ...data,
                phone: e.target.value,
              })
            )
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="johndoe@example.com"
          type="email"
          inputMode="email"
          value={data.email || ""}
          onChange={(e) =>
            onChange(
              JSON.stringify({
                ...data,
                email: e.target.value,
              })
            )
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          placeholder="Address"
          value={data.address || ""}
          onChange={(e) =>
            onChange(
              JSON.stringify({
                ...data,
                address: e.target.value,
              })
            )
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          placeholder="www.example.com"
          value={data.website || ""}
          type="url"
          inputMode="url"
          onChange={(e) =>
            onChange(
              JSON.stringify({
                ...data,
                website: e.target.value,
              })
            )
          }
        />
      </div>
    </div>
  );
};
