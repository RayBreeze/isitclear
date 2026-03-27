"use client"

import { useEffect, useState } from "react"
import GreetingCard from "@/components/dashboard/greetingcard"
import MyClasses from "@/components/dashboard/myclassescard"
import RecentDoubts from "@/components/dashboard/recentdoubt"

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/me")
      const data = await res.json()
      setUser(data)
    }

    fetchUser()
  }, [])

  if (!user) return <p>Loading...</p>

  return (
    <div className="space-y-6">

      <GreetingCard name={user.name} />

      <MyClasses />

      <RecentDoubts />

    </div>
  )
}