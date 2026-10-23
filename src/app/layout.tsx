import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ASAP Medoc | Devenir livreur",
  description:
    "Rejoignez ASAP Medoc et livrez des médicaments au Cameroun. Horaires flexibles, paiement instantané, assurance incluse.",
  openGraph: {
    title: "ASAP Medoc",
    description: "Livraison de médicaments au Cameroun",
  },
  icons: {
    icon: "/ASAP_ICON.png",
    apple: "/ASAP_ICON.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
