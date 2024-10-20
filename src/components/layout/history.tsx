import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { isLastOfArray } from "@/lib/utils";
import { Fragment } from "react";

export type HistoryItem = {
  label: string;
  href?: string;
};

type Props = {
  items: HistoryItem[];
};

export const History = ({ items }: Props) => {
  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        {items.map((item, i) => {
          if (!isLastOfArray(i, items)) {
            return (
              <Fragment key={`${item.label}`}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.href!}>{item.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator key={`${item.label}_separator`} />
              </Fragment>
            );
          } else {
            return (
              <BreadcrumbItem key={`${item.label}`}>
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
