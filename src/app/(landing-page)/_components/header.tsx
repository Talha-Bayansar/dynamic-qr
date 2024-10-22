import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="px-4 lg:px-6 flex flex-col items-center py-4 md:flex-row gap-4 justify-between">
      <Link href={routes.root} className="flex items-center justify-center">
        <Logo className="w-36" />
        <span className="sr-only">DynamicQR</span>
      </Link>
      <nav className="flex flex-col gap-4 sm:gap-6 items-center md:flex-row">
        <div className="flex gap-4 items-center">
          <Link
            href={`${routes.root}#about`}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            About
          </Link>
          <Link
            href={`${routes.root}#features`}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Features
          </Link>
          <Link
            href={`${routes.root}#pricing`}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Pricing
          </Link>
        </div>

        <Button asChild size={"sm"} className="flex gap-2">
          <Link href={routes.staticQRCode.root}>
            Free Static QR Code <ArrowRight size={16} />
          </Link>
        </Button>
      </nav>
    </header>
  );
};
