import { PageContainer } from "@/components/layout/page-container";
import { SideNavigation } from "@/components/layout/side-navigation";
import { requireAuth } from "@/features/auth/api";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  await requireAuth();

  return (
    <PageContainer className="ml-[55px] flex flex-col flex-grow">
      <SideNavigation />
      {children}
    </PageContainer>
  );
};

export default DashboardLayout;
