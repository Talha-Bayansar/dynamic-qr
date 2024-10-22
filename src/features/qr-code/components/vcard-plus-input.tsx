"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VCardPlus } from "../models";
import { View } from "@/components/layout/view";

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
        street: "",
        city: "",
        zip: "",
        country: "",
      };

  return (
    <View>
      <View className="gap-2">
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
      </View>
      <View className="gap-2">
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
      </View>
      <View className="gap-2">
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
      </View>
      <View className="gap-2">
        <Label htmlFor="street">Street</Label>
        <Input
          id="street"
          placeholder="Street"
          value={data.street || ""}
          onChange={(e) =>
            onChange(
              JSON.stringify({
                ...data,
                street: e.target.value,
              })
            )
          }
        />
      </View>
      <View className="gap-2">
        <Label htmlFor="zip">ZIP or postal code</Label>
        <Input
          id="zip"
          placeholder="ZIP or postal code"
          value={data.zip || ""}
          onChange={(e) =>
            onChange(
              JSON.stringify({
                ...data,
                zip: e.target.value,
              })
            )
          }
        />
      </View>
      <View className="gap-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          placeholder="City"
          value={data.city || ""}
          onChange={(e) =>
            onChange(
              JSON.stringify({
                ...data,
                city: e.target.value,
              })
            )
          }
        />
      </View>
      <View className="gap-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          placeholder="Country"
          value={data.country || ""}
          onChange={(e) =>
            onChange(
              JSON.stringify({
                ...data,
                country: e.target.value,
              })
            )
          }
        />
      </View>
      <View className="gap-2">
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
      </View>
    </View>
  );
};
