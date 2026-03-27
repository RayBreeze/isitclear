import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET() {
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

    const userId = session.user.id

    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      select: { classId: true },
    })

    const classIds = enrollments.map((e) => e.classId)

    if (classIds.length === 0) {
      return NextResponse.json([])
    }

    const doubts = await prisma.doubt.findMany({
      where: {
        classId: {
          in: classIds,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      include: {
        class: {
          select: { name: true },
        },
        discussions: true,
      },
    })

    return NextResponse.json(doubts)

  } catch (error) {
    console.error("RECENT DOUBTS ERROR:", error)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}