import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grief Companion",
  description: "A compassionate space for remembering and healing",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white antialiased">
        {children}
      </body>
    </html>
  );
}
