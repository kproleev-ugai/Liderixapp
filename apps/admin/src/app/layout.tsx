import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Liderix Admin Panel",
  description: "Administrative dashboard for Liderix platform management",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <AdminHeader />
          <div className="flex">
            <AdminSidebar />
            <main className="flex-1 ml-64 pt-16">
              <div className="p-6">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
