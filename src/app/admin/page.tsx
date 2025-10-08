"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Link, 
  Palette, 
  Settings, 
  Eye, 
  Plus, 
  Edit, 
  Trash2, 
  BarChart3,
  ExternalLink,
  User
} from "lucide-react"
import PreviewModal from "@/components/PreviewModal"
import ImageUpload from "@/components/ImageUpload"
import LogoUpload from "@/components/LogoUpload"
import { LinkType } from "@/types/link"

interface LinkData {
  id: string
  title: string
  url: string
  description?: string
  type: LinkType
  clickCount: number
  likeCount: number
  order: number
  isActive: boolean
}

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
  blurIntensity: string
  shadowIntensity: string
  backgroundAnimation: string
  animationSpeed: string
  customCSS?: string
}

interface SettingsData {
  id: string
  siteTitle: string
  siteDescription: string
  siteLogo?: string
  customDomain?: string
  analyticsId?: string
  isPublic: boolean
  bio?: string
  location?: string
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("links")
  const [links, setLinks] = useState<LinkData[]>([])
  const [theme, setTheme] = useState<ThemeData | null>(null)
  const [themeForm, setThemeForm] = useState<ThemeData>({
    name: "Default Theme",
    primaryColor: "#3B82F6",
    secondaryColor: "#1E40AF",
    backgroundColor: "#0F172A",
    textColor: "#FFFFFF",
    cardBackgroundColor: "rgba(255, 255, 255, 0.1)",
    cardBorderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.5",
    customCSS: "",
    backgroundAnimation: "stars",
    animationSpeed: "normal",
    blurIntensity: "10px",
    shadowIntensity: "0.25",
  })
  const [isSavingTheme, setIsSavingTheme] = useState(false)
  const [useCustomCSS, setUseCustomCSS] = useState(false)
  const [settings, setSettings] = useState<SettingsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<{
    id: string
    name: string
    email: string
    image: string
  } | null>(null)
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    image: "",
  })
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [settingsForm, setSettingsForm] = useState<SettingsData>({
    id: "",
    siteTitle: "",
    siteDescription: "",
    siteLogo: "",
    customDomain: "",
    analyticsId: "",
    isPublic: true,
    bio: "",
    location: "",
  })
  const [isSavingSettings, setIsSavingSettings] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchData()
    }
  }, [session])

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/data")
      
      if (!response.ok) {
        console.error("API response hatası:", response.status, response.statusText)
        return
      }
      
      const data = await response.json()
      
      setLinks(data.links || [])
      setTheme(data.theme)
      setSettings(data.settings)
      
      
      if (data.theme) {
        setThemeForm({
          name: data.theme.name || "Default Theme",
          primaryColor: data.theme.primaryColor || "#3B82F6",
          secondaryColor: data.theme.secondaryColor || "#1E40AF",
          backgroundColor: data.theme.backgroundColor || "#0F172A",
          textColor: data.theme.textColor || "#FFFFFF",
          cardBackgroundColor: data.theme.cardBackgroundColor || "rgba(255, 255, 255, 0.1)",
          cardBorderColor: data.theme.cardBorderColor || "rgba(255, 255, 255, 0.2)",
          borderRadius: data.theme.borderRadius || "12px",
          fontFamily: data.theme.fontFamily || "Inter",
          fontSize: data.theme.fontSize || "16px",
          fontWeight: data.theme.fontWeight || "400",
          lineHeight: data.theme.lineHeight || "1.5",
          customCSS: data.theme.customCSS || "",
          backgroundAnimation: data.theme.backgroundAnimation || "stars",
          animationSpeed: data.theme.animationSpeed || "normal",
          blurIntensity: data.theme.blurIntensity || "10px",
          shadowIntensity: data.theme.shadowIntensity || "0.25",
        })
        setUseCustomCSS(!!data.theme.customCSS)
      }
      
      
      if (data.settings) {
        setSettingsForm({
          id: data.settings.id || "",
          siteTitle: data.settings.siteTitle || "",
          siteDescription: data.settings.siteDescription || "",
          siteLogo: data.settings.siteLogo || "",
          customDomain: data.settings.customDomain || "",
          analyticsId: data.settings.analyticsId || "",
          isPublic: data.settings.isPublic ?? true,
          bio: data.settings.bio || "",
          location: data.settings.location || "",
        })
      }
      
      
      const profileResponse = await fetch("/api/admin/profile")
      const profileData = await profileResponse.json()
      setUserProfile(profileData.user)
      
          
          if (profileData.user) {
            setProfileForm({
              name: profileData.user.name || "",
              email: profileData.user.email || "",
              image: profileData.user.image || "",
            })
          }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddLink = async () => {
    const newLink = {
      title: "Yeni Link",
      url: "https://example.com",
      description: "Link açıklaması",
      type: "CUSTOM" as const,
      order: links.length,
    }

    try {
      const response = await fetch("/api/admin/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLink),
      })

      if (response.ok) {
        const data = await response.json()
        setLinks([...links, data.link])
        
        
        await fetch("/api/revalidate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: "/" }),
        })
      }
    } catch (error) {
      console.error("Error adding link:", error)
    }
  }

  const handleEditLink = async (linkId: string, updates: Partial<LinkData>) => {
    try {
      const response = await fetch("/api/admin/links", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: linkId, ...updates }),
      })

      if (response.ok) {
        const data = await response.json()
        setLinks(links.map(link => link.id === linkId ? data.link : link))
        
        
        await fetch("/api/revalidate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: "/" }),
        })
      }
    } catch (error) {
      console.error("Error updating link:", error)
    }
  }

  const handleDeleteLink = async (linkId: string) => {
    if (!confirm("Bu linki silmek istediğinizden emin misiniz?")) return

    try {
      const response = await fetch(`/api/admin/links?id=${linkId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setLinks(links.filter(link => link.id !== linkId))
        
        
        await fetch("/api/revalidate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: "/" }),
        })
      }
    } catch (error) {
      console.error("Error deleting link:", error)
    }
  }

  const handleSaveSettings = async () => {
    setIsSavingSettings(true)
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settingsForm),
      })

      if (response.ok) {
        const data = await response.json()
        setSettings(data.settings)
        
        
        await fetch("/api/revalidate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: "/" }),
        })
        
        alert("Ayarlar başarıyla kaydedildi!")
      } else {
        alert("Ayarlar kaydedilirken bir hata oluştu!")
      }
    } catch (error) {
      console.error("Error saving settings:", error)
      alert("Ayarlar kaydedilirken bir hata oluştu!")
    } finally {
      setIsSavingSettings(false)
    }
  }

  const handleSaveProfile = async () => {
    setIsSavingProfile(true)
    try {
      const response = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileForm),
      })

      if (response.ok) {
        const data = await response.json()
        setUserProfile(data.user)
        alert("Profil başarıyla kaydedildi!")
      } else {
        alert("Profil kaydedilirken bir hata oluştu!")
      }
    } catch (error) {
      console.error("Error saving profile:", error)
      alert("Profil kaydedilirken bir hata oluştu!")
    } finally {
      setIsSavingProfile(false)
    }
  }

  const handleSaveTheme = async () => {
    setIsSavingTheme(true)
    try {
      const response = await fetch("/api/admin/theme", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(themeForm),
      })

      if (response.ok) {
        const data = await response.json()
        setTheme(data.theme)
        
        
        await fetch("/api/revalidate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: "/" }),
        })
        
        alert("Tema başarıyla kaydedildi!")
      } else {
        alert("Tema kaydedilirken bir hata oluştu!")
      }
    } catch (error) {
      console.error("Error saving theme:", error)
      alert("Tema kaydedilirken bir hata oluştu!")
    } finally {
      setIsSavingTheme(false)
    }
  }

  const handleResetToDefault = async () => {
    if (confirm("Varsayılan temaya geri dönmek istediğinizden emin misiniz? Özel CSS'iniz silinecek!")) {
      const defaultTheme = {
        name: "Default Theme",
        primaryColor: "#3B82F6",
        secondaryColor: "#1E40AF",
        backgroundColor: "#0F172A",
        textColor: "#FFFFFF",
        cardBackgroundColor: "rgba(255, 255, 255, 0.1)",
        cardBorderColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: "12px",
        fontFamily: "Inter",
        fontSize: "16px",
        fontWeight: "400",
        lineHeight: "1.5",
        customCSS: "",
        backgroundAnimation: "stars",
        animationSpeed: "normal",
        blurIntensity: "10px",
        shadowIntensity: "0.25",
      }

      
      setThemeForm(defaultTheme)
      setUseCustomCSS(false)

      
      try {
        const response = await fetch("/api/admin/theme", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(defaultTheme),
        })

        if (response.ok) {
          const data = await response.json()
          setTheme(data.theme)
          
          
          await fetch("/api/revalidate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ path: "/" }),
          })
          
          alert("Tema varsayılan değerlere sıfırlandı!")
        } else {
          alert("Tema sıfırlanırken bir hata oluştu!")
        }
      } catch (error) {
        console.error("Error resetting theme:", error)
        alert("Tema sıfırlanırken bir hata oluştu!")
      }
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const tabs = [
    { id: "links", label: "Linkler", icon: Link },
    { id: "profile", label: "Profil", icon: User },
    { id: "theme", label: "Tema", icon: Palette },
    { id: "settings", label: "Ayarlar", icon: Settings },
    { id: "analytics", label: "Analitik", icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold">W</span>
              </div>
              <h1 className="text-xl font-bold">WeebLink Admin</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  fetch("/api/revalidate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ path: "/" }),
                  }).then(() => alert("Cache temizlendi!"))
                }}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                title="Ana sayfa cache'ini temizle"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Cache Temizle
              </button>
              
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Eye className="w-4 h-4" />
                Önizleme
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <span className="text-xs font-bold">
                    {session.user?.name?.charAt(0) || "U"}
                  </span>
                </div>
                <span className="text-sm">{session.user?.name}</span>
                
                <button
                  onClick={() => {
                    if (confirm("Çıkış yapmak istediğinizden emin misiniz?")) {
                      signOut({ callbackUrl: "/" })
                    }
                  }}
                  className="flex items-center gap-1 text-gray-300 hover:text-red-400 transition-colors text-sm px-2 py-1 rounded hover:bg-red-400/10"
                  title="Çıkış Yap"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Çıkış
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg mb-8">
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
        >
          {activeTab === "links" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Linklerim</h2>
                <button 
                  onClick={handleAddLink}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Yeni Link
                </button>
              </div>

              <div className="grid gap-4">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                          <Link className="w-6 h-6 text-gray-300" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{link.title}</h3>
                          <p className="text-sm text-gray-400">{link.url}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {link.clickCount} tıklama
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            const newTitle = prompt("Yeni başlık:", link.title)
                            if (newTitle) {
                              handleEditLink(link.id, { title: newTitle })
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                          title="Başlığı Düzenle"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            const newDescription = prompt("Yeni açıklama:", link.description || "")
                            if (newDescription !== null) {
                              handleEditLink(link.id, { description: newDescription })
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
                          title="Açıklamayı Düzenle"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDeleteLink(link.id)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <a
                          href={link.url}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Profil Düzenleme</h2>
                <button
                  onClick={handleSaveProfile}
                  disabled={isSavingProfile}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  {isSavingProfile ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Kaydet
                    </>
                  )}
                </button>
              </div>
              
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-6">
                <ImageUpload
                  currentImage={profileForm.image}
                  onImageChange={(imageUrl) => setProfileForm({ ...profileForm, image: imageUrl })}
                />
                
                <div>
                  <label className="block text-sm font-medium mb-2">Ad Soyad</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    placeholder="Adınız Soyadınız"
                  />
                </div>
                
                    <div>
                      <label className="block text-sm font-medium mb-2">E-posta</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        placeholder="E-posta adresiniz"
                      />
                      <p className="text-xs text-gray-400 mt-1">E-posta adresinizi değiştirebilirsiniz</p>
                    </div>
              </div>
            </div>
          )}

          {activeTab === "theme" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Tema Özelleştirme</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleResetToDefault}
                    className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Varsayılana Sıfırla
                  </button>
                  <button
                    onClick={handleSaveTheme}
                    disabled={isSavingTheme}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    {isSavingTheme ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Kaydediliyor...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Kaydet
                      </>
                    )}
                  </button>
                  <a 
                    href="/css-doc" 
                    target="_blank"
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 px-3 py-2 border border-blue-400 rounded-lg hover:bg-blue-400/10 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    CSS Dokümantasyonu
                  </a>
                </div>
              </div>

              {/* Tema Modu Seçimi */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Tema Modu</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => setUseCustomCSS(false)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      !useCustomCSS 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    Varsayılan Tema
                  </button>
                  <button
                    onClick={() => setUseCustomCSS(true)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      useCustomCSS 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    Özel CSS
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {useCustomCSS 
                    ? "Özel CSS ile tamamen özelleştirilebilir tema" 
                    : "Renk ve font ayarları ile hızlı özelleştirme"
                  }
                </p>
              </div>

              {/* Tema İçeriği */}
              {!useCustomCSS ? (
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Renk Ayarları</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Ana Renk</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={themeForm.primaryColor}
                          onChange={(e) => setThemeForm({ ...themeForm, primaryColor: e.target.value })}
                          className="w-12 h-10 rounded border border-gray-600"
                        />
                        <input
                          type="text"
                          value={themeForm.primaryColor}
                          onChange={(e) => setThemeForm({ ...themeForm, primaryColor: e.target.value })}
                          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">İkincil Renk</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={themeForm.secondaryColor}
                          onChange={(e) => setThemeForm({ ...themeForm, secondaryColor: e.target.value })}
                          className="w-12 h-10 rounded border border-gray-600"
                        />
                        <input
                          type="text"
                          value={themeForm.secondaryColor}
                          onChange={(e) => setThemeForm({ ...themeForm, secondaryColor: e.target.value })}
                          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Arkaplan Rengi</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={themeForm.backgroundColor}
                          onChange={(e) => setThemeForm({ ...themeForm, backgroundColor: e.target.value })}
                          className="w-12 h-10 rounded border border-gray-600"
                        />
                        <input
                          type="text"
                          value={themeForm.backgroundColor}
                          onChange={(e) => setThemeForm({ ...themeForm, backgroundColor: e.target.value })}
                          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Metin Rengi</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={themeForm.textColor}
                          onChange={(e) => setThemeForm({ ...themeForm, textColor: e.target.value })}
                          className="w-12 h-10 rounded border border-gray-600"
                        />
                        <input
                          type="text"
                          value={themeForm.textColor}
                          onChange={(e) => setThemeForm({ ...themeForm, textColor: e.target.value })}
                          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mt-8">Font Ayarları</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Font Ailesi</label>
                      <select
                        value={themeForm.fontFamily}
                        onChange={(e) => setThemeForm({ ...themeForm, fontFamily: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Poppins">Poppins</option>
                        <option value="Open Sans">Open Sans</option>
                        <option value="Lato">Lato</option>
                        <option value="Montserrat">Montserrat</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Font Boyutu</label>
                      <input
                        type="range"
                        min="12"
                        max="24"
                        value={parseInt(themeForm.fontSize)}
                        onChange={(e) => setThemeForm({ ...themeForm, fontSize: e.target.value + "px" })}
                        className="w-full"
                      />
                      <div className="text-sm text-gray-400 text-center">{themeForm.fontSize}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Font Kalınlığı</label>
                      <select
                        value={themeForm.fontWeight}
                        onChange={(e) => setThemeForm({ ...themeForm, fontWeight: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="300">Light (300)</option>
                        <option value="400">Normal (400)</option>
                        <option value="500">Medium (500)</option>
                        <option value="600">Semi Bold (600)</option>
                        <option value="700">Bold (700)</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Özel CSS</h3>
                  <textarea
                    value={themeForm.customCSS}
                    onChange={(e) => setThemeForm({ ...themeForm, customCSS: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white font-mono text-sm h-96"
                    placeholder="/* Özel CSS kodunuzu buraya yazın */
.main-container {
  /* Ana container stilleri */
}

.profile-card {
  /* Profil kartı stilleri */
}

.link-card {
  /* Link kartı stilleri */
}

.link-card:hover {
  /* Hover efektleri */
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}"
                  />
                  <div className="mt-4 text-sm text-gray-400">
                    <p>💡 <strong>İpucu:</strong> CSS dokümantasyonunu inceleyerek daha fazla örnek görebilirsiniz.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Site Ayarları</h2>
                <button
                  onClick={handleSaveSettings}
                  disabled={isSavingSettings}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  {isSavingSettings ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Kaydet
                    </>
                  )}
                </button>
              </div>
              
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Site Başlığı</label>
                  <input
                    type="text"
                    value={settingsForm.siteTitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, siteTitle: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    placeholder="Site başlığınız"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Site Açıklaması</label>
                  <textarea
                    value={settingsForm.siteDescription}
                    onChange={(e) => setSettingsForm({ ...settingsForm, siteDescription: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-20"
                    placeholder="Site açıklamanız"
                  />
                </div>
                
                <LogoUpload
                  currentLogo={settingsForm.siteLogo}
                  onLogoChange={(logoUrl) => setSettingsForm({ ...settingsForm, siteLogo: logoUrl })}
                />
                
                <div>
                  <label className="block text-sm font-medium mb-2">Özel Domain</label>
                  <input
                    type="text"
                    value={settingsForm.customDomain}
                    onChange={(e) => setSettingsForm({ ...settingsForm, customDomain: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    placeholder="example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Analytics ID</label>
                  <input
                    type="text"
                    value={settingsForm.analyticsId}
                    onChange={(e) => setSettingsForm({ ...settingsForm, analyticsId: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Biyografi</label>
                  <textarea
                    value={settingsForm.bio}
                    onChange={(e) => setSettingsForm({ ...settingsForm, bio: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-24"
                    placeholder="Kendiniz hakkında kısa bir açıklama..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Konum</label>
                  <input
                    type="text"
                    value={settingsForm.location}
                    onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    placeholder="İstanbul, Türkiye"
                  />
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={settingsForm.isPublic}
                    onChange={(e) => setSettingsForm({ ...settingsForm, isPublic: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                  />
                  <label htmlFor="isPublic" className="text-sm">
                    Siteyi herkese açık yap
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Analitik</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Toplam Tıklama</h3>
                  <p className="text-3xl font-bold text-blue-400">
                    {links.reduce((sum, link) => sum + link.clickCount, 0)}
                  </p>
                </div>
                
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Toplam Link</h3>
                  <p className="text-3xl font-bold text-green-400">{links.length}</p>
                </div>
                
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Aktif Link</h3>
                  <p className="text-3xl font-bold text-purple-400">
                    {links.filter(link => link.isActive).length}
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">En Popüler Linkler</h3>
                <div className="space-y-3">
                  {links
                    .sort((a, b) => b.clickCount - a.clickCount)
                    .slice(0, 5)
                    .map((link, index) => (
                      <div key={link.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <span className="font-medium">{link.title}</span>
                        </div>
                        <span className="text-blue-400 font-semibold">{link.clickCount} tıklama</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Preview Modal */}
      {themeForm && (
        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          theme={themeForm}
          links={links}
          user={{
            name: userProfile?.name || session?.user?.name || "Admin",
            email: userProfile?.email || session?.user?.email || "admin@weeblink.com",
            image: userProfile?.image || session?.user?.image || null,
          }}
          settings={settings || {
            siteTitle: "WeebLink",
            siteDescription: "My awesome link collection",
          }}
        />
      )}
    </div>
  )
}
