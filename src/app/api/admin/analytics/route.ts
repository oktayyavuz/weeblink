import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        links: {
          select: {
            id: true,
            title: true,
            clickCount: true,
            type: true,
          },
          orderBy: {
            clickCount: "desc",
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    
    const totalClicks = user.links.reduce((sum, link) => sum + link.clickCount, 0)
    
    
    const topLinks = user.links.slice(0, 5)
    
    
    const platformStats = user.links.reduce((acc, link) => {
      acc[link.type] = (acc[link.type] || 0) + link.clickCount
      return acc
    }, {} as Record<string, number>)

    
    const weeklyStats = [
      { date: "2024-10-01", clicks: 45 },
      { date: "2024-10-02", clicks: 52 },
      { date: "2024-10-03", clicks: 38 },
      { date: "2024-10-04", clicks: 67 },
      { date: "2024-10-05", clicks: 73 },
      { date: "2024-10-06", clicks: 89 },
      { date: "2024-10-07", clicks: 95 },
    ]

    return NextResponse.json({
      totalClicks,
      totalLinks: user.links.length,
      topLinks,
      platformStats,
      weeklyStats,
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
