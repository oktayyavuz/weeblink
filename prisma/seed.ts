import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  
  const adminEmail = process.env.ADMIN_EMAIL || "admin@weebdev.com"
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123"
  const adminName = process.env.ADMIN_NAME || "Admin"
  
  const hashedPassword = await bcrypt.hash(adminPassword, 12)
  
  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: adminName,
      password: hashedPassword, 
    },
  })

  
  const theme = await prisma.theme.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
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
      backgroundAnimation: "stars",
      animationSpeed: "normal",
      blurIntensity: "10px",
      shadowIntensity: "0.25",
    },
  })

  
  const settings = await prisma.settings.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      siteTitle: "WeebLink",
      siteDescription: "My awesome link collection",
      isPublic: true,
    },
  })

  
  const links = [
    {
      title: "GitHub",
      url: "https://github.com/oktayyavuz",
      description: "GitHub profilim ve projelerim",
      type: "GITHUB" as const,
      order: 1,
    },
    {
      title: "Instagram",
      url: "https://instagram.com/oktayyavuz_1",
      description: "Instagram'da beni takip et",
      type: "INSTAGRAM" as const,
      order: 2,
    },
    {
      title: "Discord",
      url: "https://discord.gg/oktayyavuzjp",
      description: "Discord kullanıcı adım",
      type: "DISCORD" as const,
      order: 3,
    },
    {
      title: "Website",
      url: "https://oktaydev.com",
      description: "Kişisel web sitem",
      type: "WEBSITE" as const,
      order: 4,
    },
  ]

  for (const linkData of links) {
    await prisma.link.upsert({
      where: { 
        id: `${user.id}-${linkData.title.toLowerCase()}` 
      },
      update: {},
      create: {
        userId: user.id,
        ...linkData,
      },
    })
  }

  console.log("✅ Test verileri oluşturuldu!")
  console.log("👤 Kullanıcı:", adminEmail)
  console.log("🔑 Şifre:", adminPassword)
  console.log("🎨 Tema:", theme.name)
  console.log("⚙️ Ayarlar:", settings.siteTitle)
  console.log("🔗 Linkler:", links.length, "adet")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
