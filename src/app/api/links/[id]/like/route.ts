import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    
    const link = await prisma.link.update({
      where: { id },
      data: {
        likeCount: {
          increment: 1,
        },
      },
    })

    return NextResponse.json({
      success: true,
      likeCount: link.likeCount,
    })
  } catch (error) {
    console.error("Like error:", error)
    return NextResponse.json(
      { error: "Failed to like link" },
      { status: 500 }
    )
  }
}
