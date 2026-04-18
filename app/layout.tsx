import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { getSiteUrl } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "UtiliTools — Ferramentas online gratuitas",
    template: "%s · UtiliTools",
  },
  description:
    "Utilitários online gratuitos: validar CPF e CNPJ, gerar dados de teste, editar texto, conversores e mais.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "UtiliTools",
    title: "UtiliTools — Ferramentas online gratuitas",
    description:
      "Utilitários online gratuitos: validar CPF e CNPJ, gerar dados de teste, editar texto, conversores e mais.",
  },
  twitter: {
    card: "summary_large_image",
    title: "UtiliTools — Ferramentas online gratuitas",
    description:
      "Utilitários online gratuitos: validar CPF e CNPJ, gerar dados de teste, editar texto, conversores e mais.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
