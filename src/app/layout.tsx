import type { Metadata } from "next";
import "./globals.css";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Institut de beauté",
  description: "Soins esthétiques, épilations, soins visage et corps. Prenez rendez-vous en ligne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
    <Header />
      <body className="min-h-screen flex flex-col">
      <main>{children}</main>
      </body>
    <Footer />
    </html>
  );
}
