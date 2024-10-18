export const routes = {
  root: "/",
  api: {
    root: "/api",
    qrCode: {
      root: "/api/qr-code",
      code: (code: string | number) => ({
        root: `/api/qr-code/${code}`,
      }),
    },
  },
  signIn: {
    root: "/sign-in",
  },
  pricing: { root: "/pricing" },
  staticQRCode: {
    root: "/static-qr-code",
  },
  dynamicQRCode: {
    root: "/dynamic-qr-code",
    code: (code: string | number) => ({
      root: `/dynamic-qr-code/${code}`,
    }),
  },
  dashboard: {
    root: "/dashboard",
    dynamicQRCodes: {
      root: "/dashboard/dynamic-qr-codes",
    },
    settings: {
      root: "/dashboard/settings",
    },
  },
};
