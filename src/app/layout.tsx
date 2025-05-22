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
      <head>
        {process.env.NEXT_PUBLIC_USE_ACKEE && (
          <script
            async
            src={`${process.env.NEXT_PUBLIC_ACKEE_URL}/tracker.js`}
            data-ackee-server={process.env.NEXT_PUBLIC_ACKEE_URL}
            data-ackee-domain-id={process.env.NEXT_PUBLIC_ACKEE_DOMAIN_ID}
          ></script>
        )}
      </head>
      <body className={`${gelasio.className} antialiased`}>{children}</body>
    </html>
  );
}
