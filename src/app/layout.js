"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";

export default function RootLayout({ children, pageProps }) {
  return (
    <SessionProvider session={pageProps?.session}>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
