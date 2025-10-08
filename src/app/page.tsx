import { prisma } from "@/lib/prisma"
import MainPage from "@/components/MainPage"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"


export const dynamic = 'force-dynamic'

export default async function Home() {
  
  const session = await getServerSession(authOptions)
  
  let user = null
  
  if (session?.user?.email) {
    
    user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        links: {
          where: { isActive: true },
          orderBy: { order: "asc" },
        },
        theme: true,
        settings: true,
      },
    })
  } else {
    
    user = await prisma.user.findFirst({
      include: {
        links: {
          where: { isActive: true },
          orderBy: { order: "asc" },
        },
        theme: true,
        settings: true,
      },
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">WeebLink</h1>
          <p className="text-gray-400 mb-8">Henüz hiç kullanıcı bulunamadı</p>
          <a
            href="/admin/login"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
          >
            Admin Paneline Git
          </a>
        </div>
      </div>
    )
  }

  const defaultTheme = {
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
    blurIntensity: "10px",
    shadowIntensity: "0.25",
    backgroundAnimation: "stars",
    animationSpeed: "normal",
    customCSS: "",
  }

  const theme = user.theme ? {
    ...user.theme,
    customCSS: user.theme.customCSS || ""
  } : defaultTheme

  return (
    <MainPage
      links={user.links}
      theme={theme}
      user={{
        name: user.name,
        email: user.email,
        image: user.image,
      }}
      settings={user.settings || {
        siteTitle: "WeebLink",
        siteDescription: "My awesome link collection",
      }}
    />
  )
}
