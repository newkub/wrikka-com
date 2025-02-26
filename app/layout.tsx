import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
});

export const metadata: Metadata = {
  title: "Wrikka.com - เรียนรู้การเขียนโค้ด",
  description: "เว็บไซต์สำหรับเรียนรู้การเขียนโค้ดแบบเข้าใจง่าย",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={ibmPlexSansThai.className}>{children}</body>
    </html>
  );
}