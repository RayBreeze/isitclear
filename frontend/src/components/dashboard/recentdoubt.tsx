"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"

function timeAgo(date: string) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  )

  const intervals = [
    { label: "y", seconds: 31536000 },
    { label: "mo", seconds: 2592000 },
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "m", seconds: 60 },
  ]

  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds)
    if (count > 0) return `${count}${i.label} ago`
  }

  return "just now"
}

export default function RecentDoubts() {
  const router = useRouter()

  const [doubts, setDoubts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const res = await fetch("/api/doubts/recent")
        const text = await res.text()

        if (!res.ok) {
          console.error(text)
          return
        }

        const data = JSON.parse(text)

        const mapped = data.map((d: any) => ({
          id: d.id,
          title: d.title,
          class: d.class?.name || "Unknown",
          answers: d.discussions.length,
          createdAt: d.createdAt,
        }))

        setDoubts(mapped)

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDoubts()
  }, [])

  if (loading) {
    return <p className="text-sm">Loading recent doubts...</p>
  }

  return (
    <section className="space-y-4">

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Doubts</h2>

        <button
          onClick={() => router.push("/dashboard/student/doubts")}
          className="text-sm text-blue-600 hover:underline"
        >
          View All
        </button>
      </div>

      <div className="bg-white border rounded-xl divide-y">

        {doubts.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">
            No recent doubts
          </p>
        ) : (
          doubts.map((doubt) => (
            <div
              key={doubt.id}
              onClick={() =>
                router.push(`/dashboard/student/doubts/${doubt.id}`)
              }
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition cursor-pointer"
            >

              {/* Left */}
              <div className="flex items-start gap-3">

                <MessageCircle size={18} className="text-gray-400 mt-1" />

                <div>
                  <h3 className="font-medium text-sm">
                    {doubt.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {doubt.class} • {timeAgo(doubt.createdAt)}
                  </p>
                </div>

              </div>

              {/* Right */}
              <div className="text-xs bg-gray-100 px-2 py-1 rounded-md">
                {doubt.answers} answers
              </div>

            </div>
          ))
        )}

      </div>

    </section>
  )
}