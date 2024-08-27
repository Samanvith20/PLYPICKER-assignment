"use client"
import { SessionProvider } from "next-auth/react";
import "./globals.css";

import Dashboard from "@/components/Dashboard";
export default function RootLayout({
  children,
  params: { session, ...params},
}) {
  return (
    <html>
      <body>
      <div className="flex flex-col min-h-screen">
        <SessionProvider session={session}>
          {children}
          <Dashboard/>
        </SessionProvider>
        </div>
      </body>
    </html>
  );
}