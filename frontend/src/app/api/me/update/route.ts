import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { name, subject, level } = body

    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name || null,
        subject: subject || null,
        level: level || null,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("UPDATE ERROR:", error)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}