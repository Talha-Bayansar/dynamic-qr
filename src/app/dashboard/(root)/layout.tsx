import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";

type Props = {
  children: React.ReactNode;
};

const DashboardRootLayout = ({ children }: Props) => {
  return (
    <Main>
      <Header title="Dashboard" />
      {children}
    </Main>
  );
};

export default DashboardRootLayout;
