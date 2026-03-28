"use client"

import { Menu, Bell, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import JoinClassModal from "./classes/joinclassmodal"
import { authClient } from "@/lib/auth-client"

interface HeaderProps {
  toggleSidebar: () => void
}

export default function DashboardHeader({ toggleSidebar }: HeaderProps) {
  const router = useRouter()

  const [openJoin, setOpenJoin] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [user, setUser] = useState<any>(null)

  // 🔥 Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me")
        const data = await res.json()
        setUser(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchUser()
  }, [])

  // 🔥 Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: any) => {
      if (!e.target.closest(".avatar-menu")) {
        setOpenMenu(false)
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 border-b bg-white">

        {/* Left */}
        <div className="flex items-center gap-3">

          <button
            onClick={toggleSidebar}
            className="hidden sm:block p-2 rounded-md hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>

          <span className="text-lg font-semibold">
            Is It Clear?
          </span>

        </div>

        {/* Right */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Search */}
          <div className="hidden sm:flex items-center border rounded-lg px-3 py-1.5 bg-gray-50">
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              placeholder="Search doubts..."
              className="bg-transparent outline-none text-sm w-44"
            />
          </div>

          {/* Join Class */}
          <JoinClassModal
        open={openJoin}
        onClose={() => setOpenJoin(false)}
        onSuccess={() => {
          console.log("Joined class")
        }}
      />

          {/* Ask Doubt */}
          <button
            onClick={() =>
              router.push("/dashboard/student/classes")
            }
            className="hidden sm:block px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Ask Doubt
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Bell size={18} />
          </button>

          {/* Avatar + Dropdown */}
          <div className="relative avatar-menu">

            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium hover:bg-gray-300"
            >
              {user?.name?.[0] || "U"}
            </button>

            {openMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md overflow-hidden text-sm">

                <button
                  onClick={() => {
                    setOpenMenu(false)
                    router.push("/dashboard/student/profile")
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </button>

                <button
                  onClick={async () => {
  setOpenMenu(false)

  await authClient.signOut()

  router.push("/auth/login")
}}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>

      </header>

      {/* 🔥 Join Class Modal */}
      
    </>
  )
}