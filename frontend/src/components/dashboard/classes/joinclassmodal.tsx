"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function JoinClassModal() {
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
            placeholder="Enter Class ID"
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
          />

          <button className="w-full bg-black text-white py-2 rounded-lg text-sm">
            Join
          </button>

        </div>

      </DialogContent>

    </Dialog>
  )
}