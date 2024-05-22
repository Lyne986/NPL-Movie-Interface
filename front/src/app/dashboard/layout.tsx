import "../globals.css";

import type { Metadata } from "next";

import { Poppins } from "next/font/google";

import Sidebar from "@/components/Sidebar/Sidebar";

const poppins = Poppins({
  subsets: ['latin-ext'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Movie Lister",
  description: "Dashboard to track your favorites movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`max-h-screen ${poppins.className} bg-white`}>
      <Sidebar />
      <div className="flex h-screen flex-col items-center justify-between p-4 md:p-4 overflow-y-hidden hide-scrollbar lg:ml-[220px]">
        {children}
      </div>
    </div>
  );
}
