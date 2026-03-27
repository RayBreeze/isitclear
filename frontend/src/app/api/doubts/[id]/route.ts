import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    if (!id) {
      return NextResponse.json(
        { error: "Missing id" },
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

    const doubt = await prisma.doubt.findUnique({
      where: { id },
      include: {
        user: {
          select: { name: true },
        },
        discussions: {
          include: {
            user: {
              select: { name: true },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    })

    if (!doubt) {
      return NextResponse.json(
        { error: "Doubt not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(doubt)
  } catch (error) {
    console.error("DOUBT DETAIL ERROR:", error)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}