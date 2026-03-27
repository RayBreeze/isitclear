"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Bookmark } from "lucide-react"

export default function DoubtDetailPage() {
  const { id } = useParams()

  const [doubt, setDoubt] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState("")
  const [bookmarked, setBookmarked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [bookmarkLoading, setBookmarkLoading] = useState(false)

  useEffect(() => {
    const fetchDoubt = async () => {
      try {
        const res = await fetch(`/api/doubts/${id}`)
        const text = await res.text()

        if (!res.ok) {
          console.error(text)
          return
        }

        const data = JSON.parse(text)

        setDoubt(data)

        // discussions → messages
        setMessages(
          data.discussions.map((d: any) => ({
            id: d.id,
            user: d.user?.name || "Unknown",
            text: d.content,
          }))
        )

        // optional: initial bookmark state (if you add later)
        setBookmarked(data.bookmarked || false)

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchDoubt()
  }, [id])

  // 🔖 Bookmark toggle
  const toggleBookmark = async () => {
    try {
      setBookmarkLoading(true)

      const res = await fetch("/api/bookmarks/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doubtId: id }),
      })

      const text = await res.text()

      if (!res.ok) {
        console.error(text)
        return
      }

      const data = JSON.parse(text)
      setBookmarked(data.bookmarked)

    } catch (err) {
      console.error(err)
    } finally {
      setBookmarkLoading(false)
    }
  }

  // 💬 Send message (UI only for now)
  const sendMessage = () => {
    if (!input.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: "You",
        text: input,
      },
    ])

    setInput("")
  }

  if (loading) return <p className="text-sm">Loading...</p>

  if (!doubt) {
    return <p className="text-red-500">Failed to load doubt</p>
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* 🧠 Doubt Card */}
      <div className="border rounded-xl p-5 bg-white space-y-4">

        <div className="flex justify-between items-start">

          <div>
            <h1 className="text-lg font-semibold leading-snug">
              {doubt.title}
            </h1>

            <p className="text-xs text-muted-foreground mt-1">
              {doubt.user?.name || "Unknown"} •{" "}
              {new Date(doubt.createdAt).toLocaleString()}
            </p>
          </div>

          <button
            onClick={toggleBookmark}
            disabled={bookmarkLoading}
            className="p-2 rounded-md hover:bg-muted transition"
          >
            <Bookmark
              size={18}
              className={
                bookmarked
                  ? "fill-violet-600 text-violet-600"
                  : "text-gray-400"
              }
            />
          </button>

        </div>

        <p className="text-sm text-gray-700 leading-relaxed">
          {doubt.description}
        </p>

      </div>

      {/* 👨‍🏫 Teacher Answer */}
      <div className="space-y-2">

        <h2 className="text-sm font-medium text-muted-foreground">
          Teacher Answer
        </h2>

        <div className="border rounded-lg p-4 bg-violet-50/30 text-sm text-muted-foreground">
          No teacher answer yet
        </div>

      </div>

      {/* 💬 Discussion */}
      <div className="space-y-3">

        <h2 className="text-sm font-medium text-muted-foreground">
          Discussion
        </h2>

        <div className="border rounded-xl p-4 space-y-2 max-h-64 overflow-y-auto bg-white">

          {messages.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No discussion yet
            </p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="text-sm">
                <span className="font-medium">{msg.user}: </span>
                <span className="text-muted-foreground">
                  {msg.text}
                </span>
              </div>
            ))
          )}

        </div>

        {/* Input */}
        <div className="flex gap-2">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add to discussion..."
            className="flex-1 px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-violet-400"
          />

          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-violet-600 text-white rounded-md text-sm"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  )
}