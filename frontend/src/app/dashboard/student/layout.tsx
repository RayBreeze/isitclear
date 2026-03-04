"use client"

import { useState } from "react"
import Sidebar from "@/components/dashboard/sidebar"
import { studentNav } from "@/configs/studentNav"
import DashboardHeader from "@/components/dashboard/header"
import DashboardFooter from "@/components/dashboard/footer"
import BottomNav from "@/components/dashboard/bottomnav"

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">

      <Sidebar open={sidebarOpen} navItems={studentNav} />

      <DashboardHeader
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <main
        className={`flex-1 p-6 pb-20 transition-all duration-300
        ${sidebarOpen ? "sm:ml-64" : "sm:ml-0"}`}
      >
        {children}
      </main>

      <BottomNav navItems={studentNav} />

      <DashboardFooter />

    </div>
  )
}