import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Analytics } from "@/db/schema";
import { isAfter, subDays } from "date-fns";
import { CartesianGrid, XAxis, YAxis, Bar, BarChart } from "recharts";

type Props = {
  analytics: Analytics[];
};

export const Geography = ({ analytics }: Props) => {
  const today = new Date();
  const sevenDaysAgo = subDays(today, 7);

  const recentAnalytics = analytics.filter((item) => {
    return isAfter(item.timestamp!, sevenDaysAgo); // Only include items after 7 days ago
  });

  const groupedByCity = recentAnalytics
    .filter((a) => !!a.city)
    .reduce<any>((acc, curr) => {
      const city = curr.city; // Extract the city from the location object

      if (acc[city!]) {
        acc[city!].scans += 1; // Increment the scan count
      } else {
        acc[city!] = { city, scans: 1 }; // Initialize with 1 scan
      }

      return acc;
    }, {});

  const data = Object.values(groupedByCity);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Geographic Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            scans: { label: "Scans", color: "hsl(var(--chart-1))" },
          }}
          className="h-[300px] w-full"
        >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="scans" fill="var(--color-scans)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
