import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav";

const open = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exclusive-Admin",
  description: "The admin for exclusive ecommerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={open.className}>
        <main>
          <Navbar/>
          <div className="bg-[#f5f5f5] w-full min-h-screen p-10 px-12">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
