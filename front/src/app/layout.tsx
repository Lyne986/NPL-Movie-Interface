import "./globals.css";

import type { Metadata } from "next";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin-ext'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Movies Lister",
  description: "Dashboard to track your favorites movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`max-h-screen ${poppins.className} bg-white`}>
        <main className="w-screen h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
