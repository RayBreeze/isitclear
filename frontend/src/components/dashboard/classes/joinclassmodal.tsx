"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function JoinClassModal({ onSuccess }: any) {

  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const handleJoin = async () => {
    if (!code) {
      alert("Enter invite code")
      return
    }

    try {
      setLoading(true)

      const res = await fetch("/api/classes/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ code }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Failed to join")
        return
      }

      alert("Joined successfully 🎉")

      setCode("")

      // 🔥 Refresh classes instantly
      if (onSuccess) onSuccess()

    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>

      <DialogTrigger asChild>
        <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
          + Join Class
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">

        <DialogHeader>
          <DialogTitle>Join Class</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <input
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter invite code"
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
          />

          <button
            onClick={handleJoin}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg text-sm disabled:opacity-50"
          >
            {loading ? "Joining..." : "Join"}
          </button>

        </div>

      </DialogContent>

    </Dialog>
  )
}