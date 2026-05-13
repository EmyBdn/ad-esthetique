import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/app/components/Footer";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ToastContainer } from "react-toastify/unstyled";
import ToastProvider from "@/app/components/ToastProvider";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Institut de beauté",
  description:
    "Soins esthétiques, épilations, soins visage et corps. Prenez rendez-vous en ligne.",
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
