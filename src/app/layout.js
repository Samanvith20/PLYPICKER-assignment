"use client"
import { SessionProvider } from "next-auth/react";
import "./globals.css";


export default function RootLayout({
  children,
  params: { session, ...params},
}) {
  return (
    <html>
      <body>
      <div className="">
        <SessionProvider session={session}>
          
          {children}
         
        </SessionProvider>
        </div>
      </body>
    </html>
  );
}