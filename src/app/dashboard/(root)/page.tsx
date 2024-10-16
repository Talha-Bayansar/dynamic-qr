import { GridView } from "@/components/layout/grid-view";
import { PlanUsage } from "@/features/subscription/plan-usage/containers/plan-usage";

const DashboardRootPage = () => {
  return (
    <GridView>
      <PlanUsage />
    </GridView>
  );
};

export default DashboardRootPage;
