import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET(
  req: Request,
  context: { params: Promise<{ classId: string }> }
) {
  try {
    // ✅ FIX: await params
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

    // ✅ check enrollment
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

    // ✅ fetch class info only
    const cls = await prisma.class.findUnique({
      where: { id: classId },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    })

    if (!cls) {
      return NextResponse.json(
        { error: "Class not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(cls)
  } catch (error) {
    console.error("API ERROR:", error)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}