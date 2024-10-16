import { GridViewSkeleton } from "@/components/layout/grid-view";
import { PlanUsageChartSkeleton } from "@/features/subscription/plan-usage/components/plan-usage-chart";

const DashboardRootLoading = () => {
  return (
    <GridViewSkeleton>
      <PlanUsageChartSkeleton />
    </GridViewSkeleton>
  );
};

export default DashboardRootLoading;
