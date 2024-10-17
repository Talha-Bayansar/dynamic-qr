"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const EmailInput = ({ value, onChange }: Props) => {
  return (
    <div className="flex gap-4 flex-col">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="johndoe@example.com"
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
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="Email subject"
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
        <Label htmlFor="body">Body</Label>
        <Textarea
          id="body"
          placeholder="Email body"
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
