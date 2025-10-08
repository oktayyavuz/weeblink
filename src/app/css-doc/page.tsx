import { Metadata } from "next"

export const metadata: Metadata = {
  title: "CSS Dokümantasyonu - WeebLink",
  description: "WeebLink için özel CSS kullanım kılavuzu",
}

export default function CSSDocPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">CSS Dokümantasyonu</h1>
          <p className="text-gray-300 text-lg">
            WeebLink&apos;te özel CSS kullanarak sitenizi tamamen özelleştirin.
          </p>
        </div>

        <div className="space-y-8">
          {/* Temel Yapı */}
          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Temel Yapı</h2>
            <p className="text-gray-300 mb-4">
              WeebLink&apos;te CSS&apos;inizi uygulayabileceğiniz ana elementler:
            </p>
            <div className="bg-gray-900 rounded p-4 font-mono text-sm">
              <pre>{`/* Ana container */
.main-container {
  /* Ana sayfa container'ı */
}

/* Site logosu */
.site-logo {
  /* Site logosu container'ı */
}

/* Profil kartı */
.profile-card {
  /* Kullanıcı profil kartı */
}

.profile-card img {
  /* Profil fotoğrafı */
}

/* Link kartları */
.link-card {
  /* Her bir link kartı */
}

.link-card .social-icon {
  /* Sosyal medya ikonları */
}

/* Arkaplan */
.background-animation {
  /* Arkaplan animasyonu */
}

/* Site başlığı */
.site-title {
  /* Site başlığı */
}

.site-description {
  /* Site açıklaması */
}`}</pre>
            </div>
          </section>

          {/* Site Logosu */}
          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Site Logosu</h2>
            <p className="text-gray-300 mb-4">
              Site logosunu özelleştirin:
            </p>
            <div className="bg-gray-900 rounded p-4 font-mono text-sm">
              <pre>{`/* Site logosu stilleri */
.site-logo {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.site-logo:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

/* Logo animasyonu */
.site-logo {
  animation: logoFloat 3s ease-in-out infinite;
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Logo efektleri */
.site-logo {
  filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));
}

.site-logo:hover {
  filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.8));
}`}</pre>
            </div>
          </section>

          {/* Profil Fotoğrafı */}
          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Profil Fotoğrafı</h2>
            <p className="text-gray-300 mb-4">
              Profil fotoğrafını özelleştirin:
            </p>
            <div className="bg-gray-900 rounded p-4 font-mono text-sm">
              <pre>{`/* Profil fotoğrafı stilleri */
.profile-card img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.profile-card img:hover {
  transform: scale(1.05);
  border-color: rgba(59, 130, 246, 0.8);
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
}

/* Profil fotoğrafı efektleri */
.profile-card img {
  filter: brightness(1.1) contrast(1.1);
}

.profile-card img:hover {
  filter: brightness(1.2) contrast(1.2) saturate(1.2);
}

/* Profil fotoğrafı animasyonu */
.profile-card img {
  animation: profilePulse 2s ease-in-out infinite;
}

@keyframes profilePulse {
  0%, 100% { 
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  50% { 
    box-shadow: 0 0 0 20px rgba(59, 130, 246, 0);
  }
}`}</pre>
            </div>
          </section>

          {/* Sosyal Medya İkonları */}
          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Sosyal Medya İkonları</h2>
            <p className="text-gray-300 mb-4">
              Sosyal medya ikonlarını özelleştirin:
            </p>
            <div className="bg-gray-900 rounded p-4 font-mono text-sm">
              <pre>{`/* Sosyal medya ikonları - Yeni Gelişmiş Versiyon */
.social-icon-container {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(99, 102, 241, 0.3);
  border: 3px solid rgba(99, 102, 241, 0.6);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
}

.social-icon {
  width: 28px;
  height: 28px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.4));
}

/* İkon renkleri */
.link-card[data-type="github"] .social-icon {
  color: #ffffff;
}

.link-card[data-type="instagram"] .social-icon {
  color: #ec4899;
}

.link-card[data-type="twitter"] .social-icon {
  color: #06b6d4;
}

.link-card[data-type="youtube"] .social-icon {
  color: #ef4444;
}

.link-card[data-type="tiktok"] .social-icon {
  color: #000000;
}

.link-card[data-type="discord"] .social-icon {
  color: #7c3aed;
}

/* Hover Animasyonları - Yeni */
.group:hover .social-icon-container {
  transform: scale(1.15) rotate(8deg);
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.6);
}

.group:hover .social-icon {
  transform: scale(1.1);
  filter: brightness(1.2);
}

/* Özel animasyonlar */
@keyframes iconPulse {
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.4) rotate(8deg); }
  100% { transform: scale(1.3) rotate(8deg); }
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
}

/* Sürekli animasyon */
.social-icon-container {
  animation: iconFloat 3s ease-in-out infinite;
}

/* Hover'da animasyonu durdur */
.group:hover .social-icon-container {
  animation-play-state: paused;
}`}</pre>
            </div>
          </section>

          {/* Beğenme ve Paylaşma */}
          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-pink-400">Beğenme ve Paylaşma</h2>
            <p className="text-gray-300 mb-4">
              Link kartlarındaki beğenme ve paylaşma butonlarını özelleştirin:
            </p>
            <div className="bg-gray-900 rounded p-4 font-mono text-sm">
              <pre>{`/* Beğenme butonu */
.link-card button[onclick*="like"] {
  transition: all 0.3s ease;
}

.link-card button[onclick*="like"]:hover {
  transform: scale(1.1);
}

/* Beğenilmiş durum */
.link-card button[onclick*="like"].liked {
  color: #ef4444;
  opacity: 1;
}

.link-card button[onclick*="like"].liked .heart-icon {
  fill: currentColor;
  animation: heartBeat 0.6s ease-in-out;
}

@keyframes heartBeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* Paylaşma butonu */
.link-card button[onclick*="share"] {
  transition: all 0.3s ease;
}

.link-card button[onclick*="share"]:hover {
  color: #3b82f6;
  transform: scale(1.1);
}

/* Stats bölümü */
.link-card .stats-section {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
  margin-top: 1rem;
}

/* Buton grupları */
.link-card .stats-section button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.link-card .stats-section button:hover {
  opacity: 1;
}

/* İkon boyutları */
.link-card .stats-section svg {
  width: 12px;
  height: 12px;
}

/* Beğeni sayısı animasyonu */
.link-card .like-count {
  transition: all 0.3s ease;
}

.link-card .like-count.updated {
  animation: countUp 0.5s ease-out;
}

@keyframes countUp {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}`}</pre>
            </div>
          </section>

          {/* Renk Özelleştirme */}
          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Renk Özelleştirme</h2>
            <p className="text-gray-300 mb-4">
              CSS değişkenleri ile renkleri özelleştirin:
            </p>
            <div className="bg-gray-900 rounded p-4 font-mono text-sm">
              <pre>{`:root {
  --primary-color: #3B82F6;
  --secondary-color: #1E40AF;
  --background-color: #0F172A;
  --text-color: #FFFFFF;
  --card-bg: rgba(255, 255, 255, 0.1);
  --card-border: rgba(255, 255, 255, 0.2);
  --logo-shadow: rgba(0, 0, 0, 0.3);
  --profile-border: rgba(255, 255, 255, 0.2);
}

/* Renkleri değiştirmek için */
.profile-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  color: var(--text-color);
}

.profile-card img {
  border-color: var(--profile-border);
}

.site-logo {
  box-shadow: 0 4px 12px var(--logo-shadow);
}

.link-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
}

.link-card:hover {
  background: var(--primary-color);
  transform: translateY(-2px);
}`}</pre>
            </div>
          </section>

          {/* Animasyonlar */}
          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Animasyonlar</h2>
            <p className="text-gray-300 mb-4">
              Özel animasyonlar ekleyin:
            </p>
            <div className="bg-gray-900 rounded p-4 font-mono text-sm">
              <pre>{`/* Hover animasyonları */
.link-card {
  transition: all 0.3s ease;
}

.link-card:hover {
  transform: scale(1.05) translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

/* Giriş animasyonları */
.profile-card {
  animation: slideInDown 0.6s ease-out;
}

.site-logo {
  animation: slideInUp 0.6s ease-out;
  animation-delay: 0.2s;
}

.link-card {
  animation: slideInUp 0.6s ease-out;
  animation-delay: calc(var(--index) * 0.1s);
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Logo animasyonu */
.site-logo {
  animation: logoFloat 3s ease-in-out infinite;
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
}`}</pre>
            </div>
          </section>

          {/* Özel Efektler */}
          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Özel Efektler</h2>
            <p className="text-gray-300 mb-4">
              Glassmorphism, neon efektleri ve daha fazlası:
            </p>
            <div className="bg-gray-900 rounded p-4 font-mono text-sm">
              <pre>{`/* Glassmorphism efekti */
.link-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.profile-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Neon efekt */
.link-card:hover {
  box-shadow: 
    0 0 20px var(--primary-color),
    0 0 40px var(--primary-color),
    0 0 60px var(--primary-color);
}

.site-logo:hover {
  filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.8));
}

/* Gradient arkaplan */
.main-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Parçacık efekti */
.background-animation::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #eee, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, #fff, transparent);
  background-repeat: repeat;
  background-size: 200px 200px;
  animation: sparkle 3s linear infinite;
}

@keyframes sparkle {
  from { transform: translateY(0px); }
  to { transform: translateY(-200px); }
}`}</pre>
            </div>
          </section>

          {/* Responsive Tasarım */}
          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-red-400">Responsive Tasarım</h2>
            <p className="text-gray-300 mb-4">
              Farklı ekran boyutları için özelleştirmeler:
            </p>
            <div className="bg-gray-900 rounded p-4 font-mono text-sm">
              <pre>{`/* Mobil cihazlar */
@media (max-width: 768px) {
  .link-card {
    margin: 0.5rem;
    padding: 1rem;
  }
  
  .profile-card {
    margin: 1rem;
  }
  
  .site-logo {
    width: 48px;
    height: 48px;
  }
  
  .profile-card img {
    width: 100px;
    height: 100px;
  }
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  .main-container {
    max-width: 600px;
  }
  
  .site-logo {
    width: 56px;
    height: 56px;
  }
}

/* Desktop */
@media (min-width: 1025px) {
  .link-card:hover {
    transform: scale(1.02) translateY(-3px);
  }
  
  .site-logo:hover {
    transform: scale(1.1);
  }
  
  .profile-card img:hover {
    transform: scale(1.05);
  }
}`}</pre>
            </div>
          </section>

          {/* İpuçları */}
          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-indigo-400">İpuçları</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-1">CSS Değişkenleri Kullanın</h3>
                  <p className="text-gray-300 text-sm">Renkleri kolayca değiştirmek için CSS değişkenlerini kullanın.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-1">Transition Ekleyin</h3>
                  <p className="text-gray-300 text-sm">Smooth geçişler için transition özelliğini kullanın.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-1">Backdrop-filter</h3>
                  <p className="text-gray-300 text-sm">Modern glassmorphism efektleri için backdrop-filter kullanın.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <h3 className="font-semibold mb-1">Box-shadow</h3>
                  <p className="text-gray-300 text-sm">Derinlik hissi için çoklu box-shadow katmanları kullanın.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">5</div>
                <div>
                  <h3 className="font-semibold mb-1">Transform</h3>
                  <p className="text-gray-300 text-sm">Hover efektleri için scale, translate ve rotate kullanın.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Örnekler */}
          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-pink-400">Hazır Örnekler</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Dark Mode Tema</h3>
                <div className="bg-gray-900 rounded p-4 font-mono text-sm">
                  <pre>{`/* Dark mode için */
:root {
  --primary-color: #8B5CF6;
  --secondary-color: #A855F7;
  --background-color: #0F0F23;
  --text-color: #E5E7EB;
  --card-bg: rgba(255, 255, 255, 0.05);
  --card-border: rgba(255, 255, 255, 0.1);
}

.site-logo {
  filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.5));
}

.profile-card img {
  border-color: rgba(139, 92, 246, 0.3);
}`}</pre>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Neon Tema</h3>
                <div className="bg-gray-900 rounded p-4 font-mono text-sm">
                  <pre>{`/* Neon tema için */
.link-card {
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #00FFFF;
  box-shadow: 
    0 0 10px #00FFFF,
    inset 0 0 10px rgba(0, 255, 255, 0.1);
}

.link-card:hover {
  box-shadow: 
    0 0 20px #00FFFF,
    0 0 40px #00FFFF,
    inset 0 0 20px rgba(0, 255, 255, 0.2);
}

.site-logo {
  filter: drop-shadow(0 0 15px #00FFFF);
}

.profile-card img {
  border-color: #00FFFF;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}`}</pre>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Minimalist Tema</h3>
                <div className="bg-gray-900 rounded p-4 font-mono text-sm">
                  <pre>{`/* Minimalist tema için */
.link-card {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #333;
}

.link-card:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.site-logo {
  filter: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-card img {
  border-color: rgba(0, 0, 0, 0.1);
}`}</pre>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/admin" 
            className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
          >
            Admin Paneline Dön
          </a>
        </div>
      </div>
    </div>
  )
}