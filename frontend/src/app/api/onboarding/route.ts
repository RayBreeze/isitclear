import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { role, name, subject, level } = await req.json();

    // 🔒 Basic Validation
    if (!role || !name || !subject || !level) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Normalize role to a consistent format for server checks
    const normalizedRole = String(role).toUpperCase();

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        role: normalizedRole,
        name,
        subject,
        level,
        onboardingComplete: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Onboarding Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}