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

export default function BookmarksPage() {
  const router = useRouter()

  const [filter, setFilter] = useState<"ALL" | "ANSWERED" | "UNANSWERED">("ALL")
  const [search, setSearch] = useState("")
  const [bookmarks, setBookmarks] = useState<Doubt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await fetch("/api/bookmarks/me")

        const text = await res.text()

        if (!res.ok) {
          console.error("API error:", text)
          return
        }

        const data = JSON.parse(text)

        // map backend → UI
        const mapped = data.map((b: any) => ({
          id: b.doubt.id,
          title: b.doubt.title,
          author: b.doubt.user?.name || "Unknown",
          time: new Date(b.doubt.createdAt).toLocaleString(),
          answers: b.doubt.discussions.length,
        }))

        setBookmarks(mapped)

      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookmarks()
  }, [])

  const filteredBookmarks = bookmarks.filter((d) => {
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

  if (loading) return <p>Loading bookmarks...</p>

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-semibold">Bookmarks</h1>
        <p className="text-sm text-muted-foreground">
          Your saved doubts for quick access
        </p>
      </div>

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
          placeholder="Search bookmarks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 text-sm rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="divide-y rounded-lg border overflow-hidden">

        {filteredBookmarks.length > 0 ? (
          filteredBookmarks.map((doubt) => (
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
            <p className="text-lg">No bookmarks yet</p>
            <p className="text-sm">
              Save doubts to access them later
            </p>
          </div>
        )}

      </div>

    </div>
  )
}