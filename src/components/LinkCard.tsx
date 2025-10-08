"use client"

import { motion } from "framer-motion"
import { ExternalLink, Heart, Share2 } from "lucide-react"
import { LinkType } from "@prisma/client"
import { getSocialMediaConfig } from "@/lib/socialMedia"
import { useState } from "react"

interface LinkCardProps {
  id: string
  title: string
  url: string
  description?: string | null
  type: LinkType
  clickCount: number
  likeCount: number
  onClick: () => void
  theme: {
    primaryColor: string
    secondaryColor: string
    cardBackgroundColor: string
    cardBorderColor: string
    textColor: string
    borderRadius: string
    fontFamily: string
    fontSize: string
    fontWeight: string
    blurIntensity: string
    shadowIntensity: string
  }
}

export default function LinkCard({ 
  id,
  title, 
  description, 
  type, 
  clickCount,
  likeCount,
  onClick,
  theme 
}: LinkCardProps) {
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isLiked) return 
    
    try {
      const response = await fetch(`/api/links/${id}/like`, {
        method: "POST",
      })
      
      if (response.ok) {
        const data = await response.json()
        setCurrentLikeCount(data.likeCount)
        setIsLiked(true)
      }
    } catch (error) {
      console.error("Like failed:", error)
    }
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description || "",
          url: window.location.href,
        })
      } catch (error) {
        console.error("Share failed:", error)
      }
    } else {
      
      navigator.clipboard.writeText(window.location.href)
      alert("Link kopyalandı!")
    }
  }
  return (
    <div
      className="group"
      style={{
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSize,
        fontWeight: theme.fontWeight,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.02,
          y: -5,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
        className="group relative overflow-hidden backdrop-blur-md border transition-all duration-300 hover:shadow-2xl cursor-pointer link-card"
        data-type={type.toLowerCase()}
        onClick={onClick}
        style={{
          backgroundColor: theme.cardBackgroundColor,
          borderColor: theme.cardBorderColor,
          borderRadius: theme.borderRadius,
          color: theme.textColor,
          backdropFilter: `blur(${theme.blurIntensity})`,
          boxShadow: `0 8px 32px rgba(0, 0, 0, ${theme.shadowIntensity})`,
        }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
          }}
        />
        
        {/* Main Content - Clickable Area */}
        <div className="relative p-6 pb-4">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm social-icon-container"
              style={{
                backgroundColor: `${getSocialMediaConfig(type).color}30`,
                border: `3px solid ${getSocialMediaConfig(type).color}60`,
                boxShadow: `0 0 20px ${getSocialMediaConfig(type).color}40`,
              }}
            >
              {(() => {
                const IconComponent = getSocialMediaConfig(type).icon
                return <IconComponent className="w-7 h-7 social-icon" style={{ color: getSocialMediaConfig(type).color }} />
              })()}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{title}</h3>
              {description && (
                <p className="text-sm opacity-80 mt-1 line-clamp-2">
                  {description}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>
        
        {/* Stats - Non-clickable Area */}
        <div 
          className="relative px-6 pb-6"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-4 pt-4 border-t border-white/10 stats-section">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-xs transition-colors ${
                isLiked 
                  ? "text-red-400 opacity-100 liked" 
                  : "opacity-60 hover:opacity-100 hover:text-red-400"
              }`}
            >
              <Heart className={`w-3 h-3 heart-icon ${isLiked ? "fill-current" : ""}`} />
              <span className="like-count">{currentLikeCount}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-xs opacity-60 hover:opacity-100 hover:text-blue-400 transition-colors"
            >
              <Share2 className="w-3 h-3" />
              <span>Paylaş</span>
            </button>
          </div>
        </div>
        
        {/* Hover effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${theme.primaryColor} 0%, transparent 70%)`,
          }}
        />
      </motion.div>
    </div>
  )
}
