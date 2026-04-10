import localFont from "next/font/local";

/** Inter static cuts from `public/Assets/Inter/static` — branding section typography. */
export const interBranding = localFont({
  src: [
    {
      path: "../public/Assets/Inter/static/Inter_18pt-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/Assets/Inter/static/Inter_18pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Assets/Inter/static/Inter_18pt-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter-branding",
  display: "swap",
});
