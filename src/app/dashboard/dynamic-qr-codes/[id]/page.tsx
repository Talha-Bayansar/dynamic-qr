import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { getAnalyticsByQrCodeId } from "@/features/analytics/qr-code-analytics/api";
import { QRCodeAnalytics } from "@/features/analytics/qr-code-analytics/containers/qr-code-analytics";
import { isArrayEmpty } from "@/lib/utils";

type Props = {
  params: {
    id: string;
  };
};

const DynamicQRCodePage = async ({ params: { id } }: Props) => {
  const analytics = await getAnalyticsByQrCodeId(parseInt(id));

  if (!analytics.success) return <ErrorState error={analytics.message!} />;

  if (isArrayEmpty(analytics.data))
    return (
      <EmptyState
        title="There are no analytics yet"
        description="Analytics will be available when your qr code is being scanned."
        action={null}
      />
    );

  return (
    <Main>
      <Header title="Analytics" />
      <QRCodeAnalytics analytics={analytics.data!} />
    </Main>
  );
};

export default DynamicQRCodePage;
