import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pelayanan Surat Desa Kemasantani",
  description: "Aplikasi pelayanan surat digital Desa Kemasantani - 42 jenis layanan surat dengan proses yang cepat dan mudah",
  keywords: ["Desa Kemasantani", "Pelayanan Surat", "Surat Digital", "Administrasi Desa", "Layanan Masyarakat"],
  authors: [{ name: "Pemerintah Desa Kemasantani" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Pelayanan Surat Desa Kemasantani",
    description: "Layanan pembuatan surat digital untuk warga Desa Kemasantani",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pelayanan Surat Desa Kemasantani",
    description: "Layanan pembuatan surat digital untuk warga Desa Kemasantani",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-emerald-50 via-white to-cyan-50 text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
