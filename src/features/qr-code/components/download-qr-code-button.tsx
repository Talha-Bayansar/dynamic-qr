import { Button, ButtonProps } from "@/components/ui/button";

type Props = {
  qrCodeRef: React.RefObject<SVGSVGElement>;
} & ButtonProps;

export const DownloadQRCodeButton = ({
  qrCodeRef,
  children,
  ...props
}: Props) => {
  const downloadQRCode = () => {
    const svg = qrCodeRef.current!;
    const svgXML = new XMLSerializer().serializeToString(svg);
    const dataUrl = "data:image/svg," + encodeURIComponent(svgXML);

    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = `qr-code.svg`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <Button {...props} onClick={downloadQRCode}>
      {children}
    </Button>
  );
};
