"use client"

import { BookOpen } from "lucide-react"

export default function MyClasses() {

  const classes = [
    { name: "Operating Systems", doubts: 12 },
    { name: "Database Systems", doubts: 8 },
    { name: "Computer Networks", doubts: 5 },
  ]

  return (
    <section className="space-y-4">

      {/* Section Header */}
      <div className="flex items-center justify-between">

        <h2 className="text-lg font-semibold">
          My Classes
        </h2>

        <a
          href="/dashboard/student/classes"
          className="text-sm text-blue-600 hover:underline"
        >
          View All
        </a>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {classes.map((cls, i) => (
          <div
            key={i}
            className="border rounded-xl p-4 bg-white hover:shadow-sm transition"
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
        ))}

      </div>

    </section>
  )
}