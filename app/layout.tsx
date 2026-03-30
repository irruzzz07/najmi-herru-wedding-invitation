import "./globals.css"
import { Playfair_Display, Cormorant_Garamond } from "next/font/google"
import type { Metadata } from "next"
import { Suspense } from "react"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Undangan Pernikahan - Najmi & Herru",
  description:
    "Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk hadir di pernikahan Najmi Safiira Wardani M A & Muhammad Herru Ristian",
}

export default function RootLayout({ children }: any) {
  return (
    <html lang="id" className={`${playfair.variable} ${cormorant.variable}`}>
      <body className="font-[family-name:var(--font-cormorant)]">
        <Suspense>{children}</Suspense>
      </body>
    </html>
  )
}
