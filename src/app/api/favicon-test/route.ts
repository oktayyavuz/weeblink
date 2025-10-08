import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const user = await prisma.user.findFirst({
      include: {
        settings: true,
      },
    })

    return NextResponse.json({
      hasLogo: !!user?.settings?.siteLogo,
      logoPath: user?.settings?.siteLogo,
      faviconUrl: user?.settings?.siteLogo ? `/api/favicon` : "/favicon.ico",
    })
  } catch (error) {
    console.error("Favicon test error:", error)
    return NextResponse.json({ error: "Error" }, { status: 500 })
  }
}
