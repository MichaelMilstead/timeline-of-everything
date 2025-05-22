import { Gelasio } from "next/font/google";
import "./globals.css";

const gelasio = Gelasio({
  subsets: ["latin"],
});

export const metadata = {
  title: "Timeline of Everything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gelasio.className} antialiased`}>{children}</body>
    </html>
  );
}
