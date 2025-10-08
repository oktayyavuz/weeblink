"use client"

import { motion } from "framer-motion"
import LinkCard from "@/components/LinkCard"
import ProfileCard from "@/components/ProfileCard"
import BackgroundAnimation from "@/components/BackgroundAnimation"
import { LinkType } from "@/types/link"
import { useEffect } from "react"

interface Link {
  id: string
  title: string
  url: string
  description?: string | null
  type: LinkType
  clickCount: number
  likeCount: number
  order: number
}

interface Theme {
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
  cardBackgroundColor: string
  cardBorderColor: string
  borderRadius: string
  fontFamily: string
  fontSize: string
  fontWeight: string
  blurIntensity: string
  shadowIntensity: string
  backgroundAnimation: string
  animationSpeed: string
  customCSS?: string
}

interface User {
  name?: string | null
  email?: string | null
  image?: string | null
}

interface Settings {
  siteTitle: string
  siteDescription: string
  siteLogo?: string | null
}

interface MainPageProps {
  links: Link[]
  theme: Theme
  user: User
  settings: Settings
}

export default function MainPage({ links, theme, user, settings }: MainPageProps) {
  
  useEffect(() => {
    
    const existingStyle = document.getElementById('custom-theme-css')
    if (existingStyle) {
      existingStyle.remove()
    }

    
    const defaultAnimations = `
      .social-icon-container {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .group:hover .social-icon-container {
        transform: scale(1.15) rotate(8deg);
        box-shadow: 0 0 30px rgba(99, 102, 241, 0.6);
      }
      
      .group:hover .social-icon {
        transform: scale(1.1);
        filter: brightness(1.2);
      }
      
      .social-icon {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
    `

    
    const finalCSS = theme.customCSS && theme.customCSS.trim() 
      ? theme.customCSS + '\n' + defaultAnimations
      : defaultAnimations

    const style = document.createElement('style')
    style.id = 'custom-theme-css'
    style.textContent = finalCSS
    document.head.appendChild(style)
  }, [theme.customCSS])

  const handleLinkClick = async (linkId: string, url: string) => {
    
    try {
      await fetch(`/api/links/${linkId}/click`, {
        method: "POST",
      })
    } catch (error) {
      console.error("Click tracking failed:", error)
    }
    
    
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen relative overflow-hidden main-container">
      {/* Background Animation */}
      <BackgroundAnimation
        animationType={theme.backgroundAnimation}
        speed={theme.animationSpeed}
        backgroundColor={theme.backgroundColor}
      />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          {/* Profile Card */}
          <div className="profile-card">
            <ProfileCard
              name={user.name}
              email={user.email}
              image={user.image}
              theme={theme}
            />
          </div>
          
          {/* Spacer */}
          <div className="h-8"></div>
          
          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4"
          >
            {links
              .sort((a, b) => a.order - b.order)
              .map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.8 + (index * 0.1) 
                  }}
                  className="link-card"
                  style={{ '--index': index } as React.CSSProperties}
                >
                  <LinkCard
                    id={link.id}
                    title={link.title}
                    url={link.url}
                    description={link.description}
                    type={link.type}
                    clickCount={link.clickCount}
                    likeCount={link.likeCount}
                    onClick={() => handleLinkClick(link.id, link.url)}
                    theme={theme}
                  />
                </motion.div>
              ))}
          </motion.div>
          
          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-12"
          >
            <p
              className="text-xs opacity-50"
              style={{
                color: theme.textColor,
                fontFamily: theme.fontFamily,
              }}
            >
              Powered by WeebLink
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
