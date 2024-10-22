"use client";

import { AddButton } from "@/components/add-button";
import { View } from "@/components/layout/view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

type LinkJson = { [key: string]: string };

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

type Link = {
  id: number;
  label: string;
  url: string;
};

export const UrlListInput = ({ value, onChange }: Props) => {
  const data: LinkJson | null = value ? JSON.parse(value) : null;
  const links = data
    ? Object.entries(data).map(([key, value], i) => ({
        id: i,
        label: key,
        url: value,
      }))
    : [];

  const linksToJson = (links: Link[]) => {
    const json: LinkJson = {};
    links.forEach((link) => {
      json[link.label] = link.url;
    });

    return json;
  };

  const onChangeLabel = (id: number, label: string) => {
    const result = links.map((link) => {
      if (link.id === id) {
        return { ...link, label };
      } else {
        return link;
      }
    });
    onChange(JSON.stringify(linksToJson(result)));
  };

  const onChangeUrl = (id: number, url: string) => {
    const result = links.map((link) => {
      if (link.id === id) {
        return { ...link, url };
      } else {
        return link;
      }
    });
    onChange(JSON.stringify(linksToJson(result)));
  };

  const addNewEntry = () => {
    const newLinks = [
      ...links,
      {
        id: links.length,
        label: `Link ${links.length + 1}`,
        url: "",
      },
    ];
    onChange(JSON.stringify(linksToJson(newLinks)));
  };

  const removeEntry = (id: number) => {
    const newLinks = links.filter((link) => link.id !== id);
    onChange(JSON.stringify(linksToJson(newLinks)));
  };

  return (
    <div>
      <View className="gap-2">
        {links.map(({ id, label, url }) => (
          <div key={id} className="flex gap-4 items-end">
            <View className="gap-1">
              <Label className="text-xs">Label</Label>
              <Input
                placeholder="Label"
                value={label}
                onChange={(e) => onChangeLabel(id, e.target.value)}
              />
            </View>
            <View className="gap-1">
              <Label className="text-xs">URL</Label>
              <Input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => onChangeUrl(id, e.target.value)}
              />
            </View>
            <Button
              onClick={() => removeEntry(id)}
              variant={"ghost"}
              size={"icon"}
              className="flex-shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <AddButton type="button" onClick={addNewEntry}>
          Add URL
        </AddButton>
      </View>
    </div>
  );
};
