import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const user = await prisma.user.findFirst({
      include: {
        settings: true,
      },
    })

    if (!user?.settings?.siteLogo) {
      return new NextResponse("No logo found", { status: 404 })
    }

    const logoPath = path.join(process.cwd(), "public", user.settings.siteLogo)
    
    if (!fs.existsSync(logoPath)) {
      return new NextResponse("Logo file not found", { status: 404 })
    }

    const logoBuffer = fs.readFileSync(logoPath)
    const ext = path.extname(user.settings.siteLogo).toLowerCase()
    
    let contentType = "image/png"
    if (ext === ".jpg" || ext === ".jpeg") {
      contentType = "image/jpeg"
    } else if (ext === ".gif") {
      contentType = "image/gif"
    } else if (ext === ".webp") {
      contentType = "image/webp"
    }

    return new NextResponse(logoBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    })
  } catch (error) {
    console.error("Favicon error:", error)
    return new NextResponse("Error", { status: 500 })
  }
}
