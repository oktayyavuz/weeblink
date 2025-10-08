import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    
    const updatedLink = await prisma.link.update({
      where: { id },
      data: {
        clickCount: {
          increment: 1,
        },
      },
    })

    return NextResponse.json({ success: true, clickCount: updatedLink.clickCount })
  } catch (error) {
    console.error("Error updating click count:", error)
    return NextResponse.json(
      { error: "Failed to update click count" },
      { status: 500 }
    )
  }
}
