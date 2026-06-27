import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import ToastProvider from "@/providers/ToastProvider";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Institut de beauté",
  description:
    "Soins esthétiques, épilations, soins visage et corps. Prenez rendez-vous en ligne.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
