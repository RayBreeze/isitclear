"use client"

import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"

type Doubt = {
  id: string
  title: string
  author: string
  time: string
  answers: number
}

export default function DoubtCard({ doubt }: { doubt: Doubt }) {
  const router = useRouter()

  return (
    <div
      onClick={() =>
        router.push(`/dashboard/student/doubts/${doubt.id}`)
      }
      className="p-4 hover:bg-gray-50 transition cursor-pointer"
    >
      <div className="flex items-start justify-between">

        <div className="flex items-start gap-3">

          <MessageCircle size={18} className="text-gray-400 mt-1" />

          <div>
            <h3 className="font-medium text-sm leading-snug">
              {doubt.title}
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              {doubt.author} • {doubt.time}
            </p>
          </div>

        </div>

        <div
          className={`text-xs px-2 py-1 rounded-md whitespace-nowrap ${
            doubt.answers === 0
              ? "bg-orange-100 text-orange-600"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {doubt.answers} answers
        </div>

      </div>
    </div>
  )
}