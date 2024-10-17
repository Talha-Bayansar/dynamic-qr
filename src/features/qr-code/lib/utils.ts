import { QRType } from "../models";

export const getQRCodeData = (value: string, type: QRType) => {
  switch (type) {
    case QRType.URL:
      return value;
    case QRType.TEXT:
      return value;
    case QRType.VCARD:
      const [name, phone, email] = value.split("\n");
      return `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
    case QRType.MESSAGE:
      const [messagePhone, message] = value.split("\n");
      return `SMSTO:${messagePhone}:${message}`;
    case QRType.EMAIL:
      const [emailAddress, subject, body] = value.split("\n");
      return `mailto:${emailAddress}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    default:
      return "";
  }
};
