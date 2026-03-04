"use client"

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function DashboardFooter() {
  return (
    <footer className="hidden sm:flex w-full border-t bg-white px-6 py-4 flex items-center justify-between text-sm text-gray-500">

      {/* Left side */}
      <p>
        ©2026 <span className="font-medium">IsItClear</span>, Made for better learning
      </p>

      {/* Right side */}
      <div className="flex items-center gap-4">

        <a href="#" className="hover:text-gray-700">
          <Facebook size={16} />
        </a>

        <a href="#" className="hover:text-gray-700">
          <Instagram size={16} />
        </a>

        <a href="#" className="hover:text-gray-700">
          <Linkedin size={16} />
        </a>

        <a href="#" className="hover:text-gray-700">
          <Twitter size={16} />
        </a>

      </div>
    </footer>
  )
}