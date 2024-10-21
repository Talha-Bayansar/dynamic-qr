import { QRCode } from "@/db/schema";
import { DynamicQRType } from "../../models";
import { UrlList } from "../components/url-list";
import { VCardPlus } from "../components/vcard-plus";
import { Documents } from "../components/documents";
import { Gallery } from "../components/gallery";
import { PDF } from "../components/pdf";

type Props = {
  qrCode: QRCode;
};

export const DynamicQRCode = ({ qrCode }: Props) => {
  switch (qrCode.type) {
    case DynamicQRType.URL_LIST:
      return <UrlList qrCode={qrCode} />;
    case DynamicQRType.VCARD_PLUS:
      return <VCardPlus qrCode={qrCode} />;
    case DynamicQRType.DOCUMENTS:
      return <Documents qrCode={qrCode} />;
    case DynamicQRType.GALLERY:
      return <Gallery qrCode={qrCode} />;
    case DynamicQRType.PDF:
      return <PDF qrCode={qrCode} />;
  }
};
