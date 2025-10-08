"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Palette, Eye, Download } from "lucide-react"

interface ThemeData {
  id?: string
  name: string
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
  lineHeight: string
  customCSS?: string
  backgroundAnimation: string
  animationSpeed: string
  blurIntensity: string
  shadowIntensity: string
}

interface ThemeCustomizerProps {
  theme: ThemeData
  onThemeChange: (theme: ThemeData) => void
}

const saveTheme = async (theme: ThemeData) => {
  try {
    const response = await fetch("/api/admin/theme", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(theme),
    })

    if (!response.ok) {
      throw new Error("Failed to save theme")
    }

    return await response.json()
  } catch (error) {
    console.error("Error saving theme:", error)
    throw error
  }
}

const FONT_FAMILIES = [
  { name: "Inter", value: "Inter" },
  { name: "Poppins", value: "Poppins" },
  { name: "Roboto", value: "Roboto" },
  { name: "Open Sans", value: "Open Sans" },
  { name: "Lato", value: "Lato" },
  { name: "Montserrat", value: "Montserrat" },
  { name: "Source Sans Pro", value: "Source Sans Pro" },
  { name: "Nunito", value: "Nunito" },
]

const ANIMATION_TYPES = [
  { name: "Yıldızlar", value: "stars" },
  { name: "Parçacıklar", value: "particles" },
  { name: "Gradient", value: "gradient" },
  { name: "Yok", value: "none" },
]

const ANIMATION_SPEEDS = [
  { name: "Yavaş", value: "slow" },
  { name: "Normal", value: "normal" },
  { name: "Hızlı", value: "fast" },
]

export default function ThemeCustomizer({ theme, onThemeChange }: ThemeCustomizerProps) {
  const [activeTab, setActiveTab] = useState("colors")
  const [customCSS, setCustomCSS] = useState(theme.customCSS || "")
  const [isSaving, setIsSaving] = useState(false)

  const updateTheme = (updates: Partial<ThemeData>) => {
    onThemeChange({ ...theme, ...updates })
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await saveTheme(theme)
      
    } catch {
      
    } finally {
      setIsSaving(false)
    }
  }

  const tabs = [
    { id: "colors", label: "Renkler", icon: Palette },
    { id: "typography", label: "Tipografi", icon: Palette },
    { id: "effects", label: "Efektler", icon: Palette },
    { id: "css", label: "Özel CSS", icon: Palette },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tema Özelleştirici</h2>
        <div className="flex gap-2">
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Eye className="w-4 h-4" />
            Önizleme
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Download className="w-4 h-4" />
            )}
            {isSaving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800 border border-gray-700 rounded-lg p-6"
      >
        {activeTab === "colors" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Renk Paleti</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ana Renk</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.primaryColor}
                    onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                    className="w-12 h-12 rounded-lg border border-gray-600"
                  />
                  <input
                    type="text"
                    value={theme.primaryColor}
                    onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">İkincil Renk</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.secondaryColor}
                    onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                    className="w-12 h-12 rounded-lg border border-gray-600"
                  />
                  <input
                    type="text"
                    value={theme.secondaryColor}
                    onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Arkaplan</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.backgroundColor}
                    onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                    className="w-12 h-12 rounded-lg border border-gray-600"
                  />
                  <input
                    type="text"
                    value={theme.backgroundColor}
                    onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Metin Rengi</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.textColor}
                    onChange={(e) => updateTheme({ textColor: e.target.value })}
                    className="w-12 h-12 rounded-lg border border-gray-600"
                  />
                  <input
                    type="text"
                    value={theme.textColor}
                    onChange={(e) => updateTheme({ textColor: e.target.value })}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "typography" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Tipografi</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Font Ailesi</label>
                <select
                  value={theme.fontFamily}
                  onChange={(e) => updateTheme({ fontFamily: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                >
                  {FONT_FAMILIES.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Font Boyutu</label>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={parseInt(theme.fontSize)}
                  onChange={(e) => updateTheme({ fontSize: e.target.value + "px" })}
                  className="w-full"
                />
                <div className="text-sm text-gray-400 mt-1">{theme.fontSize}</div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Font Ağırlığı</label>
                <select
                  value={theme.fontWeight}
                  onChange={(e) => updateTheme({ fontWeight: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                >
                  <option value="300">Light</option>
                  <option value="400">Normal</option>
                  <option value="500">Medium</option>
                  <option value="600">Semi Bold</option>
                  <option value="700">Bold</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Satır Yüksekliği</label>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.1"
                  value={parseFloat(theme.lineHeight)}
                  onChange={(e) => updateTheme({ lineHeight: e.target.value })}
                  className="w-full"
                />
                <div className="text-sm text-gray-400 mt-1">{theme.lineHeight}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "effects" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Efektler</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Arkaplan Animasyonu</label>
                <select
                  value={theme.backgroundAnimation}
                  onChange={(e) => updateTheme({ backgroundAnimation: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                >
                  {ANIMATION_TYPES.map((anim) => (
                    <option key={anim.value} value={anim.value}>
                      {anim.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Animasyon Hızı</label>
                <select
                  value={theme.animationSpeed}
                  onChange={(e) => updateTheme({ animationSpeed: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                >
                  {ANIMATION_SPEEDS.map((speed) => (
                    <option key={speed.value} value={speed.value}>
                      {speed.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Blur Yoğunluğu</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={parseInt(theme.blurIntensity)}
                  onChange={(e) => updateTheme({ blurIntensity: e.target.value + "px" })}
                  className="w-full"
                />
                <div className="text-sm text-gray-400 mt-1">{theme.blurIntensity}</div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Gölge Yoğunluğu</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={parseFloat(theme.shadowIntensity)}
                  onChange={(e) => updateTheme({ shadowIntensity: e.target.value })}
                  className="w-full"
                />
                <div className="text-sm text-gray-400 mt-1">{theme.shadowIntensity}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "css" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Özel CSS</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">CSS Kodu</label>
              <textarea
                value={customCSS}
                onChange={(e) => {
                  setCustomCSS(e.target.value)
                  updateTheme({ customCSS: e.target.value })
                }}
                placeholder="/* Özel CSS kodunuzu buraya yazın */"
                className="w-full h-64 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 font-mono text-sm"
              />
              <p className="text-sm text-gray-400 mt-2">
                Bu CSS kodu sayfanıza eklenir ve mevcut stilleri geçersiz kılar.
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
