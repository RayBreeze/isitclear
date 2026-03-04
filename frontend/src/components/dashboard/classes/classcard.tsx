"use client"

import { BookOpen } from "lucide-react"

export default function ClassCard({ cls }: any) {
  return (
    <div className="border rounded-xl p-5 bg-white hover:shadow-sm transition cursor-pointer">

      <div className="flex items-center gap-2 mb-2">
        <BookOpen size={18} />
        <h3 className="font-medium">{cls.name}</h3>
      </div>

      <p className="text-sm text-gray-500">
        {cls.doubts} doubts discussed
      </p>

    </div>
  )
}