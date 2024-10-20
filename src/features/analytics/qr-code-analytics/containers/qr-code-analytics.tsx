"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Analytics } from "@/db/schema";
import { DailyScans } from "../components/daily-scans";
import { Geography } from "../components/geography";

type Props = {
  analytics: Analytics[];
};

export const QRCodeAnalytics = ({ analytics }: Props) => {
  return (
    <Tabs className="w-full" defaultValue="overview">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="geography">Geography</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <DailyScans analytics={analytics} />
      </TabsContent>
      <TabsContent value="geography">
        <Geography analytics={analytics} />
      </TabsContent>
    </Tabs>
  );
};
