"use client"

import { useState } from "react"
import DoubtCard from "@/components/doubts/doubtcard"

export default function ClassPage({
  params,
}: {
  params: { classId: string }
}) {

  const classId = params?.classId ?? ""

  const [activeTab, setActiveTab] = useState("all")

  const doubts = [
    {
      id: 1,
      title: "What is virtual memory?",
      author: "Samman",
      time: "2h ago",
      answers: 3,
      mine: true,
    },
    {
      id: 2,
      title: "Explain deadlock prevention",
      author: "Debjit",
      time: "5h ago",
      answers: 1,
      mine: false,
    },
    {
      id: 3,
      title: "Difference between TCP and UDP",
      author: "Riddhi",
      time: "1d ago",
      answers: 0,
      mine: false,
    },
  ]

  const filteredDoubts = doubts.filter((doubt) => {
    if (activeTab === "unanswered") return doubt.answers === 0
    if (activeTab === "mine") return doubt.mine
    return true
  })

  return (
    <div className="space-y-6">

      {/* Class Header */}
      <div className="border rounded-xl p-6 bg-white flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-semibold">
            {classId.toUpperCase()}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Class Code: OS2026 • 32 students
          </p>
        </div>

        <button className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
          Ask Doubt
        </button>

      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b text-sm">

        <button
          onClick={() => setActiveTab("all")}
          className={`pb-2 ${
            activeTab === "all"
              ? "border-b-2 border-black font-medium"
              : "text-gray-500"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setActiveTab("unanswered")}
          className={`pb-2 ${
            activeTab === "unanswered"
              ? "border-b-2 border-black font-medium"
              : "text-gray-500"
          }`}
        >
          Unanswered
        </button>

        <button
          onClick={() => setActiveTab("mine")}
          className={`pb-2 ${
            activeTab === "mine"
              ? "border-b-2 border-black font-medium"
              : "text-gray-500"
          }`}
        >
          My Doubts
        </button>

      </div>

      {/* Doubt Feed */}
      <div className="bg-white border rounded-xl divide-y">

        {filteredDoubts.map((doubt) => (
          <DoubtCard key={doubt.id} doubt={doubt} />
        ))}

      </div>

    </div>
  )
}