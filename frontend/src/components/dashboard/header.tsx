"use client"

import { Menu, Bell, Search } from "lucide-react"

interface HeaderProps {
  toggleSidebar: () => void
}

export default function DashboardHeader({ toggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 border-b bg-white">

      {/* Left Section */}
      <div className="flex items-center gap-3">

        {/* Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="hidden sm:block p-2 rounded-md hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>

        {/* Branding */}
        <span className="text-lg font-semibold">
          Is It Clear?
        </span>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-4">

        {/* Search - hidden on mobile */}
        <div className="hidden sm:flex items-center border rounded-lg px-3 py-1.5 bg-gray-50">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            placeholder="Search doubts..."
            className="bg-transparent outline-none text-sm w-44"
          />
        </div>

        {/* Join Class */}
        <button className="hidden sm:block px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50">
          Join Class
        </button>

        {/* Ask Doubt */}
        <button className="hidden sm:block px-3 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800">
          + Ask Doubt
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Bell size={18} />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
          S
        </div>

      </div>
    </header>
  )
}