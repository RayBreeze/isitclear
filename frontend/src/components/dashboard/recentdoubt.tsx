"use client"

import { MessageCircle } from "lucide-react"

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

  const doubts = [
    {
      id: 1,
      title: "What is virtual memory?",
      class: "Operating Systems",
      answers: 3,
      createdAt: "2026-03-04T12:30:00",
    },
    {
      id: 2,
      title: "Explain BCNF normalization",
      class: "Database Systems",
      answers: 1,
      createdAt: "2026-03-04T10:10:00",
    },
    {
      id: 3,
      title: "Difference between TCP and UDP",
      class: "Computer Networks",
      answers: 2,
      createdAt: "2026-03-03T22:00:00",
    },
  ]

  return (
    <section className="space-y-4">

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Doubts</h2>

        <a
          href="/dashboard/student/doubts"
          className="text-sm text-blue-600 hover:underline"
        >
          View All
        </a>
      </div>

      <div className="bg-white border rounded-xl divide-y">

        {doubts.map((doubt) => (
          <div
            key={doubt.id}
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
        ))}

      </div>

    </section>
  )
}