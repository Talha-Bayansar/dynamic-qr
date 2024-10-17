"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const VCardInput = ({ value, onChange }: Props) => {
  return (
    <div className="flex gap-4 flex-col">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          value={value.split("\n")[0] || ""}
          onChange={(e) =>
            onChange(
              `${e.target.value}\n${value.split("\n")[1] || ""}\n${
                value.split("\n")[2] || ""
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
          value={value.split("\n")[1] || ""}
          onChange={(e) =>
            onChange(
              `${value.split("\n")[0] || ""}\n${e.target.value}\n${
                value.split("\n")[2] || ""
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
          value={value.split("\n")[2] || ""}
          onChange={(e) =>
            onChange(
              `${value.split("\n")[0] || ""}\n${value.split("\n")[1] || ""}\n${
                e.target.value
              }`
            )
          }
        />
      </div>
    </div>
  );
};
