'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { Provider as StoreProvider } from "react-redux";
import store from "@/redux/store";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider store={store} >
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
