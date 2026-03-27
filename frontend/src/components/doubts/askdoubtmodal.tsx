"use client"

import { useState } from "react"

export default function AskDoubtModal({
  open,
  onClose,
  classId,
  onSuccess,
}: {
  open: boolean
  onClose: () => void
  classId: string
  onSuccess: () => void
}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  if (!open) return null

  const handleSubmit = async () => {
    if (!title.trim()) return

    try {
      setLoading(true)

      const res = await fetch("/api/doubts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          classId,
        }),
      })

      const text = await res.text()

      if (!res.ok) {
        console.error("Create error:", text)
        return
      }

      // reset
      setTitle("")
      setDescription("")

      onSuccess()
      onClose()

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">

        <h2 className="text-lg font-semibold">Ask a Doubt</h2>

        <input
          placeholder="Doubt title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2.5 border rounded-md"
        />

        <textarea
          placeholder="Describe your doubt..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2.5 border rounded-md h-24 resize-none"
        />

        <div className="flex justify-end gap-2">

          <button
            onClick={onClose}
            className="px-3 py-2 text-sm border rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-violet-600 text-white rounded-md text-sm"
          >
            {loading ? "Posting..." : "Post"}
          </button>

        </div>

      </div>

    </div>
  )
}