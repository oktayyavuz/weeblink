"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Smartphone, Tablet, Monitor, RefreshCw } from "lucide-react"
import MainPage from "./MainPage"
import { LinkType } from "@prisma/client"

interface ThemeData {
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

interface LinkData {
  id: string
  title: string
  url: string
  description?: string | null
  type: LinkType
  clickCount: number
  likeCount: number
  order: number
}

interface UserData {
  name?: string | null
  email?: string | null
  image?: string | null
}

interface SettingsData {
  siteTitle: string
  siteDescription: string
  siteLogo?: string | null
}

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  theme: ThemeData
  links: LinkData[]
  user: UserData
  settings: SettingsData
}

const DEVICE_SIZES = {
  mobile: { width: 375, height: 667, name: "Mobil" },
  tablet: { width: 768, height: 1024, name: "Tablet" },
  desktop: { width: 1200, height: 800, name: "Masaüstü" },
}

export default function PreviewModal({
  isOpen,
  onClose,
  theme,
  links,
  user,
  settings,
}: PreviewModalProps) {
  const [deviceSize, setDeviceSize] = useState<keyof typeof DEVICE_SIZES>("mobile")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const currentDevice = DEVICE_SIZES[deviceSize]

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="bg-gray-900 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-white">Canlı Önizleme</h2>
              
              {/* Device Selector */}
              <div className="flex bg-gray-800 rounded-lg p-1">
                {Object.entries(DEVICE_SIZES).map(([key, device]) => (
                  <button
                    key={key}
                    onClick={() => setDeviceSize(key as keyof typeof DEVICE_SIZES)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                      deviceSize === key
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    {key === "mobile" && <Smartphone className="w-4 h-4" />}
                    {key === "tablet" && <Tablet className="w-4 h-4" />}
                    {key === "desktop" && <Monitor className="w-4 h-4" />}
                    <span className="text-sm">{device.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </button>
              
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full flex items-center justify-center p-8">
              <motion.div
                key={deviceSize}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
                style={{
                  width: Math.min(currentDevice.width, 1200),
                  height: Math.min(currentDevice.height, 800),
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              >
                {/* Device Frame */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-300 rounded-full"></div>
                </div>

                {/* Preview Content */}
                <div className="h-full overflow-auto">
                  <div
                    style={{
                      transform: `scale(${Math.min(
                        currentDevice.width / 375,
                        currentDevice.height / 667
                      )})`,
                      transformOrigin: "top left",
                      width: "375px",
                      height: "667px",
                    }}
                  >
                    <MainPage
                      links={links}
                      theme={theme}
                      user={user}
                      settings={settings}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700 bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Boyut: {currentDevice.width} × {currentDevice.height}px
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Kapat
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Değişiklikleri Kaydet
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
