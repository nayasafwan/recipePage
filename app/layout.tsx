"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientComponent from "./components/parent/client";
import Navbar from "./components/navbar";
import Appbar from "./components/appbar";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono", 
  weight: "100 900",
});
 

const valentrix = localFont({
  src : "./fonts/Valentrix.woff",
  variable : "--font-valentrix",
  weight : "100 900"
})


const metadata: Metadata = {
  title: "Recipe",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${valentrix.variable} antialiased`}
      >
        <main>
        <ClientComponent>
           <div className="flex h-screen">
               <Navbar />
               <div className="flex-1 ">
                   <Appbar />
                   <div className="px-10 py-6">
                       {children}
                   </div>
               </div>
           </div>
        </ClientComponent>
        </main>
      </body>
    </html>
  );
}
