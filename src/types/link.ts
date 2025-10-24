
export type LinkType = 
  | "CUSTOM"
  | "INSTAGRAM" 
  | "TWITTER"
  | "FACEBOOK"
  | "YOUTUBE"
  | "TIKTOK"
  | "LINKEDIN"
  | "GITHUB"
  | "DISCORD"
  | "TELEGRAM"
  | "WHATSAPP"
  | "SPOTIFY"
  | "TWITCH"
  | "SNAPCHAT"
  | "PINTEREST"
  | "REDDIT"
  | "MEDIUM"
  | "BEHANCE"
  | "DRIBBBLE"
  | "FIGMA"
  | "EMAIL"
  | "PHONE"
  | "WEBSITE"


export interface Link {
  id: string
  title: string
  url: string
  description?: string | null
  icon?: string | null
  type: LinkType
  order: number
  isActive: boolean
  clickCount: number
  likeCount: number
  createdAt: Date
  updatedAt: Date
  userId: string
}
