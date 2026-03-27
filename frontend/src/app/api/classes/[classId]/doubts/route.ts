import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET(
  req: Request,
  context: { params: Promise<{ classId: string }> }
) {
  try {
    const { classId } = await context.params

    if (!classId) {
      return NextResponse.json(
        { error: "Missing classId" },
        { status: 400 }
      )
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // check enrollment
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: session.user.id,
        classId: classId,
      },
    })

    if (!enrollment) {
      return NextResponse.json(
        { error: "Not allowed" },
        { status: 403 }
      )
    }

    // fetch doubts only
    const doubts = await prisma.doubt.findMany({
      where: {
        classId: classId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(doubts)
  } catch (error) {
    console.error("DOUBTS API ERROR:", error)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}