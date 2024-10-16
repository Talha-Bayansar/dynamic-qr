"use client";

import { AlertCircle, Check, TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { SubscriptionPlan } from "../../models";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  usage: {
    label: "Usage",
  },
  limit: {
    label: "Limit",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

type Props = {
  usage: number;
  limit: number;
  plan: SubscriptionPlan;
};

export function PlanUsageChart({ usage, limit, plan }: Props) {
  const planExceeded = usage > limit;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Plan usage</CardTitle>
        <CardDescription className="capitalize">{plan} plan</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={[{ usage, limit }]}
            startAngle={0}
            endAngle={(usage / limit) * 360}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="usage" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {usage.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Dynamic QR Codes
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <Alert variant={planExceeded ? "destructive" : "default"}>
          {planExceeded ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          <AlertTitle>
            {planExceeded ? "Exceeded Plan" : "Remaining"}
          </AlertTitle>
          <AlertDescription>
            {planExceeded
              ? `Exceeded limit of ${limit} dynamic QR codes.`
              : `You can still create up to ${limit} dynamic QR codes.`}
          </AlertDescription>
        </Alert>
      </CardFooter>
    </Card>
  );
}

export const PlanUsageChartSkeleton = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-5" />
      </CardHeader>
      <CardContent className="flex-1 p-6 flex justify-center items-center">
        <Skeleton className="rounded-full w-[172px] h-[172px]" />
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <Skeleton className="w-full h-[72px]" />
      </CardFooter>
    </Card>
  );
};
