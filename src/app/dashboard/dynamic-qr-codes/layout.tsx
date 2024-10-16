import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";

type Props = {
  children: React.ReactNode;
};

const DynamicQRCodesLayout = ({ children }: Props) => {
  return (
    <Main className="flex-grow">
      <Header title="Dynamic QR Codes" />
      {children}
    </Main>
  );
};

export default DynamicQRCodesLayout;
