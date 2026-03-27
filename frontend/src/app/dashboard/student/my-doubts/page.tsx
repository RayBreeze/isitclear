"use client"

import { useEffect, useState } from "react"
import DoubtCard from "@/components/doubts/doubtcard"
import { useRouter } from "next/navigation"

type Doubt = {
  id: string
  title: string
  author: string
  time: string
  answers: number
}

export default function MyDoubtsPage() {
  const router = useRouter()

  const [filter, setFilter] = useState<"ALL" | "ANSWERED" | "UNANSWERED">("UNANSWERED")
  const [search, setSearch] = useState("")
  const [doubts, setDoubts] = useState<Doubt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const res = await fetch("/api/doubts/me")

        const text = await res.text()

        if (!res.ok) {
          console.error("API error:", text)
          return
        }

        const data = JSON.parse(text)

        // map backend → UI format
        const mapped = data.map((d: any) => ({
          id: d.id,
          title: d.title,
          author: "You",
          time: new Date(d.createdAt).toLocaleString(),
          answers: d.discussions.length,
        }))

        setDoubts(mapped)
      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDoubts()
  }, [])

  // 🔍 Filter + Search
  const filteredDoubts = doubts.filter((d) => {
    const matchesFilter =
      filter === "ALL"
        ? true
        : filter === "ANSWERED"
        ? d.answers > 0
        : d.answers === 0

    const matchesSearch =
      d.title.toLowerCase().includes(search.toLowerCase())

    return matchesFilter && matchesSearch
  })

  if (loading) {
    return <p className="text-sm">Loading your doubts...</p>
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">My Doubts</h1>
        <p className="text-sm text-muted-foreground">
          Track your questions and responses
        </p>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">

        <div className="flex gap-2">
          {["ALL", "UNANSWERED", "ANSWERED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition
                ${
                  filter === f
                    ? "bg-primary text-white border-primary"
                    : "hover:bg-muted"
                }`}
            >
              {f === "ALL"
                ? "All"
                : f === "UNANSWERED"
                ? "Unanswered"
                : "Answered"}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search doubts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 text-sm rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Doubts List */}
      <div className="divide-y rounded-lg border overflow-hidden">

        {filteredDoubts.length > 0 ? (
          filteredDoubts.map((doubt) => (
            <div
              key={doubt.id}
              onClick={() =>
                router.push(`/dashboard/student/doubts/${doubt.id}`)
              }
            >
              <DoubtCard doubt={doubt} />
            </div>
          ))
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No doubts found</p>
            <p className="text-sm">
              Try changing filters or ask a new doubt
            </p>
          </div>
        )}

      </div>

    </div>
  )
}