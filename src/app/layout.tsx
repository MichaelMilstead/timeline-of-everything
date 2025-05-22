"use client";
import { components } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";
import { Gelasio } from "next/font/google";
import "./globals.css";

const gelasio = Gelasio({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gelasio.className} antialiased`}>
        <TamboProvider
          apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
          components={components}
          tamboUrl={process.env.NEXT_PUBLIC_TAMBO_API_URL}
        >
          {children}
        </TamboProvider>
      </body>
    </html>
  );
}
