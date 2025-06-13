import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PikaMed - Sağlık Yönetim Sistemi",
  description: "Doktor ve admin paneli ile sağlık yönetim sistemi",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          href="/marultarlası.jpg"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system" storageKey="pikamed-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
