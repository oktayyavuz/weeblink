import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import fs from "fs"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    
    const uploadDir = path.join(process.cwd(), process.env.UPLOAD_DIR || "public/uploads")
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const formData = await request.formData()
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 })
    }

    
    const maxFileSize = parseInt(process.env.MAX_FILE_SIZE || "5242880") 
    if (file.size > maxFileSize) {
      return NextResponse.json({ 
        error: `File size must be less than ${Math.round(maxFileSize / 1024 / 1024)}MB` 
      }, { status: 400 })
    }

    
    const timestamp = Date.now()
    const extension = path.extname(file.name)
    const newFileName = `profile_${timestamp}${extension}`
    const newFilePath = path.join(uploadDir, newFileName)

    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    fs.writeFileSync(newFilePath, buffer)

    
    const imageUrl = `/uploads/${newFileName}`

    return NextResponse.json({ 
      success: true, 
      imageUrl,
      message: "Fotoğraf başarıyla yüklendi!" 
    })

  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Upload failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}