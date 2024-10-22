import { View } from "@/components/layout/view";
import { QRCode } from "@/db/schema";
import { UrlListItem } from "../../models";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Main } from "@/components/layout/main";
import { Title } from "@/components/layout/title";

type Props = {
  qrCode: QRCode;
};

export const UrlList = ({ qrCode }: Props) => {
  const links: UrlListItem[] = Object.entries(qrCode.value as any).map(
    ([key, value]) => ({
      label: key,
      url: value as string,
    })
  );

  return (
    <Main className="w-full md:items-center justify-center">
      <View className="max-w-md w-full">
        <Title>{qrCode.name}</Title>
        {links.map((link) => (
          <Button key={link.label} asChild>
            <Link href={link.url}>{link.label}</Link>
          </Button>
        ))}
      </View>
    </Main>
  );
};
