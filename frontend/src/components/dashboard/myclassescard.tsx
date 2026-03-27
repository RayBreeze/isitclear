"use client"

import { useEffect, useState } from "react"
import { BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"

export default function MyClasses() {
  const router = useRouter()

  const [classes, setClasses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch("/api/classes/me")
        const text = await res.text()

        if (!res.ok) {
          console.error(text)
          return
        }

        const data = JSON.parse(text)
        setClasses(data)

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchClasses()
  }, [])

  if (loading) {
    return <p className="text-sm">Loading classes...</p>
  }

  return (
    <section className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">

        <h2 className="text-lg font-semibold">
          My Classes
        </h2>

        <button
          onClick={() =>
            router.push("/dashboard/student/classes")
          }
          className="text-sm text-blue-600 hover:underline"
        >
          View All
        </button>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {classes.length === 0 ? (
          <p className="text-sm text-gray-500">
            No classes joined yet
          </p>
        ) : (
          classes.map((cls) => (
            <div
              key={cls.id}
              onClick={() =>
                router.push(`/dashboard/student/classes/${cls.id}`)
              }
              className="border rounded-xl p-4 bg-white hover:shadow-sm transition cursor-pointer"
            >

              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={18} />
                <h3 className="font-medium">
                  {cls.name}
                </h3>
              </div>

              <p className="text-sm text-gray-500">
                {cls.doubts} doubts discussed
              </p>

            </div>
          ))
        )}

      </div>

    </section>
  )
}