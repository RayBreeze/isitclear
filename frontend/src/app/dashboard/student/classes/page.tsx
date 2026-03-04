"use client"

import { useState } from "react"
import ClassCard from "@/components/dashboard/classes/classcard"
import JoinClassModal from "@/components/dashboard/classes/joinclassmodal"
import Link from "next/link"


export default function MyClassesPage() {

  const [joinOpen, setJoinOpen] = useState(false)

  const classes = [
    { id: "os", name: "Operating Systems", doubts: 12 },
    { id: "dbms", name: "Database Systems", doubts: 8 },
    { id: "cn", name: "Computer Networks", doubts: 5 },
  ]

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <h1 className="text-2xl font-semibold">
          My Classes
        </h1>
      </div>
    <JoinClassModal/>


{/* Classes Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

  {classes.map((cls) => (
    <Link
      key={cls.id}
      href={`/dashboard/student/classes/${cls.id}`}
    >
      <ClassCard cls={cls} />
    </Link>
  ))}

</div>
    </div>
  )
}