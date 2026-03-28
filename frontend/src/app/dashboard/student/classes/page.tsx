"use client"

import { useEffect, useState } from "react"
import ClassCard from "@/components/dashboard/classes/classcard"
import JoinClassModal from "@/components/dashboard/classes/joinclassmodal"
import Link from "next/link"

export default function MyClassesPage() {

  const [classes, setClasses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 🔥 Fetch function (reusable)
  const fetchClasses = async () => {
    try {
      const res = await fetch("/api/classes/me", {
        credentials: "include",
      })

      if (!res.ok) {
        throw new Error("Failed to fetch classes")
      }

      const data = await res.json()

      if (Array.isArray(data)) {
        setClasses(data)
      } else {
        console.error("Invalid data format:", data)
        setClasses([])
      }

    } catch (err) {
      console.error("Error:", err)
      setClasses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          My Classes
        </h1>

        {/* 🔥 Modal Trigger */}
        <JoinClassModal onSuccess={fetchClasses} />
      </div>

      {/* Loading */}
      {loading && <p>Loading classes...</p>}

      {/* Empty State */}
      {!loading && classes.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No classes joined yet</p>
            <p className="text-sm">
              It looks like you haven't joined any classes yet.
            </p>
          </div>
      )}

      {/* Classes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {classes.map((cls) => (
          <Link
            key={cls.id}
            href={`/dashboard/student/classes/${cls.id}`}
          >
            <ClassCard cls={cls} />
          </Link>
        ))}

      </div>
    </div>
  )
}