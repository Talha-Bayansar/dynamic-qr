import { EmptyState } from "@/components/empty-state";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Analytics } from "@/db/schema";
import { isArrayEmpty } from "@/lib/utils";
import { CartesianGrid, XAxis, YAxis, Area, AreaChart } from "recharts";
import { format, isAfter, subDays } from "date-fns";

type Props = {
  analytics: Analytics[];
};

export const DailyScans = ({ analytics }: Props) => {
  const today = new Date();
  const sevenDaysAgo = subDays(today, 7);

  const recentAnalytics = analytics
    .filter((item) => {
      return isAfter(item.timestamp!, sevenDaysAgo); // Only include items after 7 days ago
    })
    .sort((a, b) => a.timestamp!.getTime() - b.timestamp!.getTime());

  const groupedByDate = recentAnalytics.reduce<any>((acc, curr) => {
    const date = format(curr.timestamp!, "yyyy-MM-dd");

    if (acc[date]) {
      acc[date].scans += 1; // Increment the scan count
    } else {
      acc[date] = { date, scans: 1 }; // Initialize with 1 scan
    }

    return acc;
  }, {});

  const data = Object.values(groupedByDate);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Scans</CardTitle>
      </CardHeader>
      <CardContent>
        {isArrayEmpty(analytics) ? (
          <EmptyState
            title="No data yet"
            description="Data will be updated when this QR code is scanned."
          />
        ) : (
          <ChartContainer
            config={{
              scans: { label: "Scans", color: "hsl(var(--chart-1))" },
            }}
            className="h-[300px] w-full"
          >
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="scans"
                stroke="var(--color-scans)"
                fill="var(--color-scans)"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
