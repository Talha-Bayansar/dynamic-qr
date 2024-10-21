export enum QRType {
  URL = "url",
  TEXT = "text",
  VCARD = "vcard",
  MESSAGE = "message",
  EMAIL = "email",
}

export enum DynamicQRType {
  URL_LIST = "url-list",
  VCARD_PLUS = "vcard-plus",
  PDF = "pdf",
  GALLERY = "gallery",
  DOCUMENTS = "documents",
}

export type VCardPlus = {
  name: string;
  phone: string;
  email: string;
  address: string;
  website: string;
};
