import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hintro Dashboard",
  description: "AI-powered call insights and knowledge management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}