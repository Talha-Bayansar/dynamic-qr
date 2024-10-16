"use server";
import { getPlanUsage } from "../api";
import { ErrorState } from "@/components/error-state";
import { PlanUsageChart } from "../components/plan-usage-chart";
import { SubscriptionPlan } from "../../models";

export const PlanUsage = async () => {
  const response = await getPlanUsage();

  if (!response.success) return <ErrorState error={response.message!} />;

  const data = response.data!;

  return (
    <PlanUsageChart
      plan={data.plan as SubscriptionPlan}
      limit={data.limit}
      usage={data.usage}
    />
  );
};
