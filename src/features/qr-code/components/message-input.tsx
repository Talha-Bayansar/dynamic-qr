"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const MessageInput = ({ value, onChange }: Props) => {
  return (
    <div className="flex gap-4 flex-col">
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          placeholder="+1234567890"
          value={value.split("\n")[0] || ""}
          onChange={(e) =>
            onChange(`${e.target.value}\n${value.split("\n")[1] || ""}`)
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Enter your message here"
          value={value.split("\n")[1] || ""}
          onChange={(e) =>
            onChange(`${value.split("\n")[0] || ""}\n${e.target.value}`)
          }
        />
      </div>
    </div>
  );
};
