import NextAuthSessionProvider from "@/providers/sessionProvider";
import "../../styles/globals.css";
import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/taskIcon.ico"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthSessionProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </NextAuthSessionProvider>
  );
}
