import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/auth/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { onboardingComplete: true },
  })

  if (user?.onboardingComplete) {
    redirect("/dashboard/student")
  }

  return children
}