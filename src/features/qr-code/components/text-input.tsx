"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const TextInput = ({ value, onChange }: Props) => {
  return (
    <div className="flex gap-2 flex-col">
      <Label htmlFor="text">Text</Label>
      <Textarea
        id="text"
        placeholder="Enter your text here"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
