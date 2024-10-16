"use client";

import { routes } from "@/lib/routes";
import { Home, LucideIcon, QrCode, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
  Icon: LucideIcon;
};

export const SideNavigation = () => {
  const pathName = usePathname();

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: routes.dashboard.root,
      Icon: Home,
    },
    {
      label: "Dynamic QR Codes",
      href: routes.dashboard.dynamicQRCodes.root,
      Icon: QrCode,
    },
  ];

  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-10 w-14 flex-col border-r bg-background flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4 sm:py-8">
          {navItems.map(({ href, label, Icon }) => (
            <Tooltip key={`nav-item-${label}`}>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    {
                      "text-foreground hover:text-primary": pathName === href,
                    }
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4 sm:py-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={routes.dashboard.settings.root}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  {
                    "text-foreground hover:text-primary":
                      pathName === routes.dashboard.settings.root,
                  }
                )}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  );
};
