import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DigiBot101 - AI Assistant",
  description: "AI assistant with voice capabilities and dual personas (Ava Skye/Matt Payne)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
