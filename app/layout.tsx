import type React from "react";
import type { Metadata } from "next";
import { Nunito, Roboto } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// Fonts
const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

// Metadata
export const metadata: Metadata = {
  title: "7DayCrush!",
  description: "7DayCrush! Dashboard Login",
  icons: {
    icon: "/Vector.png",
  },
  openGraph: {
    title: "7DayCrush!",
    description: "7DayCrush! Dashboard Login",
    images: ["/Vector.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${nunito.variable} ${roboto.variable}`}>
        {children}

        {/* Global Toasts */}
        <Toaster
          position="top-right"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
