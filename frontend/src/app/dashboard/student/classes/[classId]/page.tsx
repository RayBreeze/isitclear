"use client"

import { useEffect, useState } from "react"
import DoubtCard from "@/components/doubts/doubtcard"
import { useParams } from "next/navigation"
import AskDoubtModal from "@/components/doubts/askdoubtmodal"

export default function ClassPage() {
  const params = useParams()
  const classId = params?.classId as string

  const [filter, setFilter] = useState<"ALL" | "UNANSWERED" | "ANSWERED">("ALL")
  const [cls, setCls] = useState<any>(null)
  const [doubts, setDoubts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)

      // 📦 Class Info
      const classRes = await fetch(`/api/classes/${classId}/info`)
      const classData = await classRes.json()
      setCls(classData)

      // 📦 Doubts
      const doubtsRes = await fetch(`/api/classes/${classId}/doubts`)
      const doubtsData = await doubtsRes.json()

      const mapped = doubtsData.map((d: any) => ({
        id: d.id,
        title: d.title,
        author: d.user?.name || "Unknown",
        time: new Date(d.createdAt).toLocaleString(),
        answers: d.discussions?.length || 0,
      }))

      setDoubts(mapped)

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (classId) fetchData()
  }, [classId])

  if (loading) return <p>Loading...</p>

  if (!cls) {
    return <p className="text-red-500">Failed to load class</p>
  }

  // 🎯 Filter Logic
  const filteredDoubts = doubts.filter((d) => {
    if (filter === "ANSWERED") return d.answers > 0
    if (filter === "UNANSWERED") return d.answers === 0
    return true
  })

  return (
    <div className="space-y-6 max-w-3xl mx-auto">

      {/* 🧠 Class Header */}
      <div className="border rounded-xl p-6 bg-white flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-semibold">
            {cls.name}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Class ID: {cls.id}
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
        >
          Ask Doubt
        </button>

      </div>

      {/* 🎯 FILTER BUTTONS */}
      <div className="flex gap-2">

        {[
          { key: "ALL", label: "All" },
          { key: "UNANSWERED", label: "Unanswered" },
          { key: "ANSWERED", label: "Answered" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as any)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition
              ${
                filter === f.key
                  ? "bg-black text-white border-black"
                  : "hover:bg-gray-100"
              }`}
          >
            {f.label}
          </button>
        ))}

      </div>

      {/* 📋 Doubt Feed */}
      <div className="bg-white border rounded-xl divide-y">

        {filteredDoubts.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">
            No doubts found
          </p>
        ) : (
          filteredDoubts.map((doubt) => (
            <DoubtCard key={doubt.id} doubt={doubt} />
          ))
        )}

      </div>

      {/* 🧩 Modal */}
      <AskDoubtModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        classId={classId}
        onSuccess={fetchData} // 🔥 no reload anymore
      />

    </div>
  )
}