"use client"

import { useEffect, useState } from "react"

export default function ProfileSettings() {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    level: "",
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const levels = [
    "Primary",
    "Lower Secondary",
    "Upper Secondary",
    "Undergraduate",
    "Postgraduate",
    "Doctoral",
  ]

  // 🚀 Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me")
        const text = await res.text()

        if (!res.ok) {
          console.error("Fetch error:", text)
          return
        }

        const data = JSON.parse(text)

        setForm({
          name: data.name || "",
          subject: data.subject || "",
          level: data.level || "",
        })
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  // 💾 Save
  const handleSave = async () => {
    try {
      setSaving(true)

      const res = await fetch("/api/me/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      const text = await res.text()

      if (!res.ok) {
        console.error("Save error:", text)
        return
      }

      console.log("Profile updated")

    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p>Loading profile...</p>

  return (
    <div className="space-y-6 max-w-2xl">

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Profile Settings</h1>
        <p className="text-sm text-muted-foreground">
          Update your academic profile
        </p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-6">

        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold">
            {form.name?.[0] || "U"}
          </div>

          <div className="absolute bottom-0 right-0 bg-violet-600 text-white text-xs p-1 rounded-full">
            ✎
          </div>
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-2 text-sm bg-violet-600 text-white rounded-md">
            Upload
          </button>
          <button className="px-3 py-2 text-sm border rounded-md">
            Remove
          </button>
        </div>

      </div>

      {/* Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Name */}
        <div className="space-y-1 sm:col-span-2">
          <label className="text-sm text-muted-foreground">Name</label>
          <input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-violet-400 outline-none"
          />
        </div>

        {/* Level */}
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">Level</label>
          <select
            value={form.level}
            onChange={(e) =>
              setForm({ ...form, level: e.target.value })
            }
            className="w-full p-2.5 border rounded-md"
          >
            {levels.map((lvl) => (
              <option key={lvl}>{lvl}</option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">Subject</label>
          <input
            value={form.subject}
            onChange={(e) =>
              setForm({ ...form, subject: e.target.value })
            }
            className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-violet-400 outline-none"
          />
        </div>

      </div>

      {/* Save */}
      <div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 bg-violet-600 text-white rounded-md text-sm hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

    </div>
  )
}