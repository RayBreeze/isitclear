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

    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        class: {
          include: {
            _count: {
              select: {
                doubts: true,
              },
            },
          },
        },
      },
    })

    const classes = enrollments.map((e) => ({
      id: e.class.id,
      name: e.class.name,
      doubts: e.class._count.doubts,
    }))

    return NextResponse.json(classes)
  } catch (error) {
    console.error("Error fetching classes:", error)

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}