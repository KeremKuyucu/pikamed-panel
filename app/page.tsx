"use client"

import { useState } from "react"
import AdminPanel from "@/admin-panel"
import DoctorPanel from "@/doctor-panel"

export default function Home() {
  const [panel, setPanel] = useState<"admin" | "doctor" | null>(null)

  if (panel === "admin") {
    return <AdminPanel />
  }

  if (panel === "doctor") {
    return <DoctorPanel />
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">PikaMed</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Sağlık Yönetim Sistemi</p>
      </div>

      <div className="grid w-full max-w-md gap-4 sm:grid-cols-2">
        <button
          onClick={() => setPanel("admin")}
          className="flex flex-col items-center justify-center rounded-lg border border-teal-100 dark:border-teal-900 bg-white dark:bg-gray-800 p-8 shadow-md transition-all hover:shadow-lg"
        >
          <div className="mb-4 rounded-full bg-teal-100 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-teal-600"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Admin Panel</h2>
          <p className="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">
            Sistem yönetimi ve doktor atamaları
          </p>
        </button>

        <button
          onClick={() => setPanel("doctor")}
          className="flex flex-col items-center justify-center rounded-lg border border-blue-100 dark:border-blue-900 bg-white dark:bg-gray-800 p-8 shadow-md transition-all hover:shadow-lg"
        >
          <div className="mb-4 rounded-full bg-blue-100 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-blue-600"
            >
              <path d="M8.56 3.69a9 9 0 0 0-2.92 1.95"></path>
              <path d="M3.69 8.56A9 9 0 0 0 3 12"></path>
              <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92"></path>
              <path d="M8.56 20.31A9 9 0 0 0 12 21"></path>
              <path d="M15.44 20.31a9 9 0 0 0 2.92-1.95"></path>
              <path d="M20.31 15.44A9 9 0 0 0 21 12"></path>
              <path d="M20.31 8.56a9 9 0 0 0-1.95-2.92"></path>
              <path d="M15.44 3.69A9 9 0 0 0 12 3"></path>
              <circle cx="12" cy="12" r="2"></circle>
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Doktor Panel</h2>
          <p className="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">Hasta takibi ve sağlık verileri</p>
        </button>
      </div>
    </div>
  )
}
