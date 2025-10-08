"use client"

import { motion } from "framer-motion"
import { User, Mail, MapPin, Calendar } from "lucide-react"

interface ProfileCardProps {
  name?: string | null
  email?: string | null
  image?: string | null
  bio?: string
  location?: string
  joinDate?: string
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

export default function ProfileCard({
  name,
  email,
  image,
  bio,
  location,
  joinDate,
  theme,
}: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
      style={{
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSize,
        fontWeight: theme.fontWeight,
      }}
    >
      <div
        className="relative overflow-hidden backdrop-blur-md border transition-all duration-500 hover:shadow-2xl"
        style={{
          backgroundColor: theme.cardBackgroundColor,
          borderColor: theme.cardBorderColor,
          borderRadius: theme.borderRadius,
          color: theme.textColor,
          backdropFilter: `blur(${theme.blurIntensity})`,
          boxShadow: `0 20px 40px rgba(0, 0, 0, ${theme.shadowIntensity})`,
        }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
          }}
        />
        
        {/* Content */}
        <div className="relative p-8 text-center">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative mx-auto mb-6"
          >
            <div
              className="w-24 h-24 rounded-full mx-auto overflow-hidden border-4 backdrop-blur-sm"
              style={{
                borderColor: theme.primaryColor,
                backgroundColor: `${theme.primaryColor}20`,
              }}
            >
              {image ? (
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-12 h-12 opacity-60" />
                </div>
              )}
            </div>
            
            {/* Online indicator */}
            <div
              className="absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white"
              style={{ backgroundColor: theme.primaryColor }}
            />
          </motion.div>
          
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-2xl font-bold mb-2"
          >
            {name || "Anonim Kullanıcı"}
          </motion.h1>
          
          {/* Bio */}
          {bio && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-sm opacity-80 mb-4 max-w-sm mx-auto"
            >
              {bio}
            </motion.p>
          )}
          
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="space-y-2"
          >
            {email && (
              <div className="flex items-center justify-center gap-2 text-sm opacity-70">
                <Mail className="w-4 h-4" />
                <span>{email}</span>
              </div>
            )}
            
            {location && (
              <div className="flex items-center justify-center gap-2 text-sm opacity-70">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
            )}
            
            {joinDate && (
              <div className="flex items-center justify-center gap-2 text-sm opacity-70">
                <Calendar className="w-4 h-4" />
                <span>{joinDate}</span>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full opacity-5"
          style={{ backgroundColor: theme.primaryColor }} />
        <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full opacity-5"
          style={{ backgroundColor: theme.secondaryColor }} />
      </div>
    </motion.div>
  )
}
