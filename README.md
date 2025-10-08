# WeebLink - Modern Linktree Clone

WeebLink, tamamen özelleştirilebilir, modern bir Linktree klonudur. Prisma ORM, Next.js ve Tailwind CSS kullanılarak geliştirilmiştir.

## 🌟 Demo

**Canlı Demo**: [me.oktaydev.com](https://me.oktaydev.com)

## ✨ Özellikler

- 🎨 **Tam Özelleştirilebilir Tema**: Renkler, fontlar, boyutlar ve daha fazlası
- 🎭 **Canlı Önizleme**: Değişiklikleri anında görün
- 📱 **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- 🔐 **Güvenli Admin Paneli**: Şifreli giriş sistemi
- 📊 **Analitik**: Link tıklama ve beğeni istatistikleri
- 🎪 **Animasyonlar**: Modern hover efektleri ve geçişler
- 📁 **Dosya Yükleme**: Profil fotoğrafı ve site logosu
- 🎨 **Özel CSS**: Kendi CSS kodlarınızı ekleyin
- 🌟 **Sosyal Medya İkonları**: Gerçek ikon paketleri ile
- 🔄 **Real-time Güncelleme**: Değişiklikler anında yansır

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+
- npm veya yarn

### Adımlar

1. **Repository'yi klonlayın**
   ```bash
   git clone https://github.com/oktayyavuz/weeblink.git
   cd weeblink
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Environment dosyasını oluşturun**
   ```bash
   cp env.example .env
   ```

4. **Environment değişkenlerini düzenleyin**
   ```env
   # Database
   DATABASE_URL="file:./dev.db"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # Admin Credentials
   ADMIN_EMAIL="admin@weeblink.com"
   ADMIN_PASSWORD="your-secure-password"
   ADMIN_NAME="Admin"

   # Google OAuth (opsiyonel)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

5. **Veritabanını oluşturun ve seed edin**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

6. **Development server'ı başlatın**
```bash
npm run dev
   ```

7. **Tarayıcıda açın**
   ```
   http://localhost:3000
   ```

## 🔑 Admin Paneli

Admin paneline erişim için:
- URL: `http://localhost:3000/admin/login`
- Email: `.env` dosyasındaki `ADMIN_EMAIL`
- Şifre: `.env` dosyasındaki `ADMIN_PASSWORD`

### Admin Panel Özellikleri

#### 📊 **Dashboard**
- Link yönetimi (ekleme, düzenleme, silme)
- Tema özelleştirme
- Profil yönetimi
- Site ayarları
- Analitik görünümü

#### 🎨 **Tema Özelleştirme**
- Renk paleti
- Font ayarları
- Animasyon seçenekleri
- Özel CSS desteği
- Canlı önizleme

#### 🔗 **Link Yönetimi**
- Sosyal medya linkleri
- Özel linkler
- Sıralama
- Aktif/Pasif durumu
- Tıklama istatistikleri

#### 📈 **Analitik**
- Toplam tıklama sayısı
- En popüler linkler
- Beğeni istatistikleri
- Zaman bazlı analiz

## 📁 Proje Yapısı

```
weeblink/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin paneli
│   │   ├── api/            # API routes
│   │   ├── css-doc/        # CSS dokümantasyonu
│   │   └── page.tsx        # Ana sayfa
│   ├── components/         # React bileşenleri
│   └── lib/               # Yardımcı kütüphaneler
├── prisma/
│   ├── schema.prisma      # Veritabanı şeması
│   └── seed.ts           # Seed dosyası
└── public/
    └── uploads/          # Yüklenen dosyalar
```

## 🎨 Özelleştirme

### Tema Özelleştirme
- Admin panelde "Tema" sekmesinden renkleri değiştirin
- Özel CSS ekleyerek tam kontrol sağlayın
- Canlı önizleme ile değişiklikleri görün

### CSS Dokümantasyonu
Detaylı CSS rehberi için: `http://localhost:3000/css-doc`

### Sosyal Medya İkonları
- GitHub, Instagram, Discord, Twitter, YouTube, TikTok
- Gerçek ikon paketleri (`react-icons/fa`)
- Özelleştirilebilir renkler ve animasyonlar

## 🚀 Production Deployment

### Vercel (Önerilen)

1. **Vercel'e deploy edin**
   ```bash
   npx vercel
   ```

2. **Environment değişkenlerini ayarlayın**
   - Vercel dashboard'da environment variables ekleyin
   - `DATABASE_URL` için PostgreSQL URL'i kullanın

3. **Veritabanını migrate edin**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

### Diğer Platformlar

- **Railway**: PostgreSQL + Node.js
- **Heroku**: PostgreSQL + Node.js
- **DigitalOcean**: App Platform

## 🔒 Güvenlik

- Şifreler bcrypt ile hash'lenir
- Environment değişkenleri ile hassas bilgiler korunur
- NextAuth.js ile güvenli authentication
- SQL injection koruması (Prisma ORM)
- CSRF koruması
- Session yönetimi

## 📝 API Endpoints

### Admin API
- `GET /api/admin/data` - Admin verilerini getir
- `PUT /api/admin/theme` - Tema kaydet
- `PUT /api/admin/settings` - Site ayarları
- `PUT /api/admin/profile` - Profil güncelle
- `POST /api/admin/links` - Link ekle
- `PUT /api/admin/links` - Link güncelle
- `DELETE /api/admin/links` - Link sil

### Public API
- `POST /api/links/[id]/click` - Link tıklama
- `POST /api/links/[id]/like` - Link beğenme
- `GET /api/favicon` - Dinamik favicon

### Utility API
- `POST /api/revalidate` - Cache temizleme
- `POST /api/admin/upload` - Dosya yükleme

## 🎯 Kullanım Senaryoları

### Kişisel Link Sayfası
- Sosyal medya linklerinizi tek yerde toplayın
- Profesyonel görünüm için tema özelleştirin
- Tıklama istatistiklerini takip edin

### İş Profili
- Şirket logosu ve renkleri kullanın
- Ürün/hizmet linklerini organize edin
- Müşteri etkileşimlerini analiz edin

### Etkinlik Sayfası
- Etkinlik bilgilerini paylaşın
- Kayıt linklerini organize edin
- Katılımcı istatistiklerini görün

## 🔧 Geliştirme

### Scripts
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run setup        # Tek komut kurulum
npm run db:generate  # Prisma client generate
npm run db:migrate   # Database migration
npm run db:studio    # Prisma Studio
npm run db:seed      # Database seed
```

### Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

- **GitHub**: [@oktayyavuz](https://github.com/oktayyavuz)
- **Demo**: [me.oktaydev.com](https://me.oktaydev.com)
- **Email**: oktayyavuz_1@outlook.com

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/)
- [Prisma](https://prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://framer.com/motion/)
- [NextAuth.js](https://next-auth.js.org/)
- [React Icons](https://react-icons.github.io/react-icons/)

## 📄 Lisans

MIT License - Detaylar için `LICENSE` dosyasına bakın.

---

**WeebLink** ile modern, özelleştirilebilir link sayfanızı oluşturun! 🚀✨