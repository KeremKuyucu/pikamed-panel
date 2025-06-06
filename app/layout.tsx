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
          href="https://cdn.glitch.global/e74d89f5-045d-4ad2-94c7-e2c99ed95318/logo.png?v=1747478110513"
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
