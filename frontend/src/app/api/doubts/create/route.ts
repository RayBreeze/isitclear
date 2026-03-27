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
    const { title, description, classId } = body

    if (!title || !classId) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      )
    }

    // 🔐 check enrollment
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: session.user.id,
        classId,
      },
    })

    if (!enrollment) {
      return NextResponse.json(
        { error: "Not allowed" },
        { status: 403 }
      )
    }

    const doubt = await prisma.doubt.create({
      data: {
        title,
        description,
        userId: session.user.id,
        classId,
      },
    })

    return NextResponse.json(doubt)
  } catch (error) {
    console.error("CREATE DOUBT ERROR:", error)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}