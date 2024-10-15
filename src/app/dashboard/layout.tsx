import { requireAuth } from "@/features/auth/api";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  await requireAuth();

  return children;
};

export default DashboardLayout;
