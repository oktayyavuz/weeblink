import { LinkType } from "@/types/link"
import { 
  FaInstagram, 
  FaTwitter, 
  FaFacebook, 
  FaYoutube, 
  FaTiktok, 
  FaLinkedin, 
  FaGithub, 
  FaDiscord, 
  FaTelegram, 
  FaWhatsapp, 
  FaSpotify, 
  FaTwitch, 
  FaSnapchat, 
  FaPinterest, 
  FaReddit, 
  FaMedium, 
  FaBehance, 
  FaDribbble, 
  FaFigma, 
  FaEnvelope, 
  FaPhone, 
  FaGlobe, 
  FaLink 
} from "react-icons/fa"

export const SOCIAL_MEDIA_CONFIG = {
  INSTAGRAM: {
    name: "Instagram",
    icon: FaInstagram,
    color: "#E4405F",
    urlPattern: "https://instagram.com/",
  },
  TWITTER: {
    name: "Twitter",
    icon: FaTwitter,
    color: "#1DA1F2",
    urlPattern: "https://twitter.com/",
  },
  FACEBOOK: {
    name: "Facebook",
    icon: FaFacebook,
    color: "#1877F2",
    urlPattern: "https://facebook.com/",
  },
  YOUTUBE: {
    name: "YouTube",
    icon: FaYoutube,
    color: "#FF0000",
    urlPattern: "https://youtube.com/",
  },
  TIKTOK: {
    name: "TikTok",
    icon: FaTiktok,
    color: "#000000",
    urlPattern: "https://tiktok.com/@",
  },
  LINKEDIN: {
    name: "LinkedIn",
    icon: FaLinkedin,
    color: "#0077B5",
    urlPattern: "https://linkedin.com/in/",
  },
  GITHUB: {
    name: "GitHub",
    icon: FaGithub,
    color: "#333333",
    urlPattern: "https://github.com/",
  },
  DISCORD: {
    name: "Discord",
    icon: FaDiscord,
    color: "#5865F2",
    urlPattern: "https://discord.gg/",
  },
  TELEGRAM: {
    name: "Telegram",
    icon: FaTelegram,
    color: "#0088CC",
    urlPattern: "https://t.me/",
  },
  WHATSAPP: {
    name: "WhatsApp",
    icon: FaWhatsapp,
    color: "#25D366",
    urlPattern: "https://wa.me/",
  },
  SPOTIFY: {
    name: "Spotify",
    icon: FaSpotify,
    color: "#1DB954",
    urlPattern: "https://open.spotify.com/",
  },
  TWITCH: {
    name: "Twitch",
    icon: FaTwitch,
    color: "#9146FF",
    urlPattern: "https://twitch.tv/",
  },
  SNAPCHAT: {
    name: "Snapchat",
    icon: FaSnapchat,
    color: "#FFFC00",
    urlPattern: "https://snapchat.com/add/",
  },
  PINTEREST: {
    name: "Pinterest",
    icon: FaPinterest,
    color: "#BD081C",
    urlPattern: "https://pinterest.com/",
  },
  REDDIT: {
    name: "Reddit",
    icon: FaReddit,
    color: "#FF4500",
    urlPattern: "https://reddit.com/r/",
  },
  MEDIUM: {
    name: "Medium",
    icon: FaMedium,
    color: "#000000",
    urlPattern: "https://medium.com/@",
  },
  BEHANCE: {
    name: "Behance",
    icon: FaBehance,
    color: "#1769FF",
    urlPattern: "https://behance.net/",
  },
  DRIBBBLE: {
    name: "Dribbble",
    icon: FaDribbble,
    color: "#EA4C89",
    urlPattern: "https://dribbble.com/",
  },
  FIGMA: {
    name: "Figma",
    icon: FaFigma,
    color: "#F24E1E",
    urlPattern: "https://figma.com/@",
  },
  EMAIL: {
    name: "E-posta",
    icon: FaEnvelope,
    color: "#EA4335",
    urlPattern: "mailto:",
  },
  PHONE: {
    name: "Telefon",
    icon: FaPhone,
    color: "#34A853",
    urlPattern: "tel:",
  },
  WEBSITE: {
    name: "Website",
    icon: FaGlobe,
    color: "#4285F4",
    urlPattern: "https://",
  },
  CUSTOM: {
    name: "Özel",
    icon: FaLink,
    color: "#6B7280",
    urlPattern: "",
  },
}

export function getSocialMediaConfig(type: LinkType) {
  return SOCIAL_MEDIA_CONFIG[type] || SOCIAL_MEDIA_CONFIG.CUSTOM
}

export function formatUrl(type: LinkType, value: string): string {
  const config = getSocialMediaConfig(type)
  
  if (type === "CUSTOM") {
    return value
  }
  
  
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value
  }
  
  
  if (config.urlPattern) {
    
    const cleanValue = value.replace(/^@/, "")
    return config.urlPattern + cleanValue
  }
  
  return value
}

export function validateUrl(type: LinkType, url: string): boolean {
  if (type === "CUSTOM") {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
  
  const config = getSocialMediaConfig(type)
  return url.startsWith(config.urlPattern || "")
}

export function extractUsername(type: LinkType, url: string): string {
  const config = getSocialMediaConfig(type)
  if (!config.urlPattern) return ""
  
  if (url.startsWith(config.urlPattern)) {
    return url.replace(config.urlPattern, "")
  }
  
  return ""
}
