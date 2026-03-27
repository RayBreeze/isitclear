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

    const { code } = await req.json()

    if (!code) {
      return NextResponse.json({ error: "Invite code required" }, { status: 400 })
    }

    const classData = await prisma.class.findUnique({
      where: { inviteCode: code },
    })

    if (!classData) {
      return NextResponse.json({ error: "Invalid invite code" }, { status: 404 })
    }

    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_classId: {
          userId: session.user.id,
          classId: classData.id,
        },
      },
    })

    if (existing) {
      return NextResponse.json({ error: "Already joined" }, { status: 400 })
    }

    await prisma.enrollment.create({
      data: {
        userId: session.user.id,
        classId: classData.id,
      },
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("JOIN ERROR 👉", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}