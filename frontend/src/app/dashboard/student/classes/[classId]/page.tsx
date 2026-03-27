"use client"

import { useEffect, useState } from "react"
import DoubtCard from "@/components/doubts/doubtcard"
import { useParams } from "next/navigation"
import AskDoubtModal from "@/components/doubts/askdoubtmodal"

export default function ClassPage() {
  const params = useParams()
  const classId = params?.classId as string

  const [activeTab, setActiveTab] = useState("all")
  const [cls, setCls] = useState<any>(null)
  const [doubts, setDoubts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch class info
        const classRes = await fetch(`/api/classes/${classId}/info`)
        const classText = await classRes.text()

        if (!classRes.ok) {
          console.error("Class API error:", classText)
          return
        }

        const classData = JSON.parse(classText)
        setCls(classData)

        // fetch doubts
        const doubtsRes = await fetch(`/api/classes/${classId}/doubts`)
        const doubtsText = await doubtsRes.text()

        if (!doubtsRes.ok) {
          console.error("Doubts API error:", doubtsText)
          return
        }

        const doubtsData = JSON.parse(doubtsText)

        // map backend → UI format
        const mapped = doubtsData.map((d: any) => ({
          id: d.id,
          title: d.title,
          author: d.user?.name || "Unknown",
          time: new Date(d.createdAt).toLocaleString(),
          answers: 0, // placeholder (we’ll add later)
          mine: false, // we’ll fix later
        }))

        setDoubts(mapped)

      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    if (classId) fetchData()
  }, [classId])

  if (loading) return <p>Loading...</p>

  if (!cls) {
    return <p className="text-red-500">Failed to load class</p>
  }

  // filtering logic (unchanged)
  const filteredDoubts = doubts.filter((doubt) => {
    if (activeTab === "unanswered") return doubt.answers === 0
    if (activeTab === "mine") return doubt.mine
    return true
  })

  return (
    <div className="space-y-6 max-w-3xl mx-auto">

      {/* Class Header */}
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

        {filteredDoubts.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">
            No doubts yet
          </p>
        ) : (
          filteredDoubts.map((doubt) => (
            <DoubtCard key={doubt.id} doubt={doubt} />
          ))
        )}

      </div>
        <AskDoubtModal
  open={openModal}
  onClose={() => setOpenModal(false)}
  classId={classId}
  onSuccess={() => {
    // 🔥 refetch doubts
    window.location.reload()
  }}
/>
    </div>
  )
}