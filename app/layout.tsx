import { Suspense } from "react";
import "./globals.css"
import { Cormorant, Amiri } from "next/font/google"
import type React from "react"
import { Analytics } from "@vercel/analytics/react"

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
})

const amiri = Amiri({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
})

export const metadata = {
  title: "Prayer Times App",
  description: "View Islamic Prayer (Namaaz/ Salah) timings",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${amiri.variable}`}>
      <body>
        <Suspense fallback={null}>
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
