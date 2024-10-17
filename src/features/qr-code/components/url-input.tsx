"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const UrlInput = ({ value, onChange }: Props) => {
  return (
    <div className="flex gap-2 flex-col">
      <Label htmlFor="url">URL</Label>
      <Input
        id="url"
        placeholder="https://example.com"
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
