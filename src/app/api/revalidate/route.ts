import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json()
    
    
    revalidatePath("/")
    
    
    if (path) {
      revalidatePath(path)
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Cache cleared successfully",
      revalidated: path ? ["/", path] : ["/"]
    })
  } catch (error) {
    console.error("Revalidation error:", error)
    return NextResponse.json(
      { error: "Failed to clear cache" },
      { status: 500 }
    )
  }
}
