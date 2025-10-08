"use client"

import { useState, useRef } from "react"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { motion } from "framer-motion"

interface ImageUploadProps {
  currentImage?: string | null
  onImageChange: (imageUrl: string) => void
  className?: string
}

export default function ImageUpload({ currentImage, onImageChange, className = "" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Lütfen sadece resim dosyası seçin!")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Dosya boyutu 5MB'dan küçük olmalı!")
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setPreview(data.imageUrl)
        onImageChange(data.imageUrl)
      } else {
        alert("Upload hatası: " + (data.error || "Bilinmeyen hata"))
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload sırasında bir hata oluştu!")
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => {
    setDragActive(false)
  }

  const removeImage = () => {
    setPreview(null)
    onImageChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium mb-2">Profil Fotoğrafı</label>
      
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${dragActive 
            ? "border-blue-400 bg-blue-50/10" 
            : "border-gray-600 hover:border-gray-500"
          }
          ${isUploading ? "opacity-50 pointer-events-none" : "cursor-pointer"}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Profil fotoğrafı"
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-700"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeImage()
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto bg-gray-700 rounded-full flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <p className="text-sm text-gray-300">
                {isUploading ? "Yükleniyor..." : "Fotoğraf yüklemek için tıklayın"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                veya sürükleyip bırakın
              </p>
            </div>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-gray-900/50 rounded-lg flex items-center justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Yükleniyor...</span>
            </div>
          </div>
        )}
      </div>

      {/* Upload Button */}
      {!preview && (
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg px-4 py-2 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Upload className="w-4 h-4" />
          {isUploading ? "Yükleniyor..." : "Fotoğraf Seç"}
        </button>
      )}

      {/* Info */}
      <div className="text-xs text-gray-500">
        <p>• Desteklenen formatlar: JPG, PNG, GIF</p>
        <p>• Maksimum dosya boyutu: 5MB</p>
        <p>• Önerilen boyut: 400x400px</p>
      </div>
    </div>
  )
}
