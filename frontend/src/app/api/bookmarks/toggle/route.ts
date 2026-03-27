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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { doubtId } = await req.json()

    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_doubtId: {
          userId: session.user.id,
          doubtId,
        },
      },
    })

    if (existing) {
      await prisma.bookmark.delete({
        where: { id: existing.id },
      })

      return NextResponse.json({ bookmarked: false })
    }

    await prisma.bookmark.create({
      data: {
        userId: session.user.id,
        doubtId,
      },
    })

    return NextResponse.json({ bookmarked: true })

  } catch (error) {
    console.error("BOOKMARK TOGGLE ERROR:", error)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}