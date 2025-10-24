"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Save, Link as LinkIcon, Type, Globe, Hash } from "lucide-react"
import { LinkType } from "@/types/link"
import { SOCIAL_MEDIA_CONFIG, formatUrl } from "@/lib/socialMedia"

interface LinkEditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (linkData: LinkFormData) => void
  link?: {
    id: string
    title: string
    url: string
    description?: string
    type: LinkType
    order: number
  } | null
}

export interface LinkFormData {
  title: string
  url: string
  description: string
  type: LinkType
}

export default function LinkEditModal({ isOpen, onClose, onSave, link }: LinkEditModalProps) {
  const [formData, setFormData] = useState<LinkFormData>({
    title: "",
    url: "",
    description: "",
    type: "CUSTOM"
  })
  const [urlInput, setUrlInput] = useState("")
  const [isValidatingUrl, setIsValidatingUrl] = useState(false)

  useEffect(() => {
    if (link) {
      setFormData({
        title: link.title,
        url: link.url,
        description: link.description || "",
        type: link.type
      })
      setUrlInput(link.url)
    } else {
      setFormData({
        title: "",
        url: "",
        description: "",
        type: "CUSTOM"
      })
      setUrlInput("")
    }
  }, [link])

  const handleTypeChange = (type: LinkType) => {
    setFormData({ ...formData, type })
    
    
    if (urlInput && type !== "CUSTOM") {
      const formattedUrl = formatUrl(type, urlInput)
      setFormData({ ...formData, type, url: formattedUrl })
    }
  }

  const handleUrlChange = (value: string) => {
    setUrlInput(value)
    
    
    if (formData.type !== "CUSTOM") {
      const formattedUrl = formatUrl(formData.type, value)
      setFormData({ ...formData, url: formattedUrl })
    } else {
      setFormData({ ...formData, url: value })
    }
  }

  const handleSave = () => {
    if (!formData.title.trim() || !formData.url.trim()) {
      alert("Başlık ve URL alanları zorunludur!")
      return
    }

    onSave(formData)
    onClose()
  }

  const socialMediaTypes = Object.entries(SOCIAL_MEDIA_CONFIG).map(([key, config]) => ({
    key: key as LinkType,
    ...config
  }))

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">
                {link ? "Link Düzenle" : "Yeni Link Ekle"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Sosyal Medya Tipi Seçimi */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Sosyal Medya Tipi
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {socialMediaTypes.map((social) => {
                    const IconComponent = social.icon
                    return (
                      <button
                        key={social.key}
                        onClick={() => handleTypeChange(social.key)}
                        className={`p-3 rounded-lg border transition-all ${
                          formData.type === social.key
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-gray-600 hover:border-gray-500 hover:bg-gray-700/50"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <IconComponent 
                            className="w-6 h-6" 
                            style={{ color: social.color }}
                          />
                          <span className="text-xs text-gray-300 text-center">
                            {social.name}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Type className="w-4 h-4 inline mr-1" />
                    Başlık *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Link başlığı"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Globe className="w-4 h-4 inline mr-1" />
                    URL *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={urlInput}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                      placeholder={
                        formData.type === "CUSTOM" 
                          ? "https://example.com" 
                          : SOCIAL_MEDIA_CONFIG[formData.type].urlPattern + "kullaniciadi"
                      }
                    />
                    {formData.type !== "CUSTOM" && (
                      <div className="flex items-center px-3 py-2 bg-gray-600 rounded-lg text-sm text-gray-300">
                        <LinkIcon className="w-4 h-4 mr-1" />
                        {SOCIAL_MEDIA_CONFIG[formData.type].urlPattern}
                      </div>
                    )}
                  </div>
                  {formData.type !== "CUSTOM" && (
                    <p className="text-xs text-gray-400 mt-1">
                      Sadece kullanıcı adını girin, URL otomatik formatlanacak
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Hash className="w-4 h-4 inline mr-1" />
                    Açıklama
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none h-20 resize-none"
                    placeholder="Link açıklaması (isteğe bağlı)"
                  />
                </div>
              </div>

              {/* Preview */}
              {formData.title && formData.url && (
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Önizleme:</h3>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: `${SOCIAL_MEDIA_CONFIG[formData.type].color}30`,
                        border: `2px solid ${SOCIAL_MEDIA_CONFIG[formData.type].color}60`,
                      }}
                    >
                      {(() => {
                        const IconComponent = SOCIAL_MEDIA_CONFIG[formData.type].icon
                        return <IconComponent 
                          className="w-5 h-5" 
                          style={{ color: SOCIAL_MEDIA_CONFIG[formData.type].color }} 
                        />
                      })()}
                    </div>
                    <div>
                      <p className="font-medium text-white">{formData.title}</p>
                      {formData.description && (
                        <p className="text-sm text-gray-400">{formData.description}</p>
                      )}
                      <p className="text-xs text-gray-500">{formData.url}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-700">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                {link ? "Güncelle" : "Kaydet"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

