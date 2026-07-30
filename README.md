# ✦ seromitschu.xyz

<div align="center">

**İnteraktif Dijital Portfolyo & Yaşayan Deneyim Alanı**

[ 🌐 Canlı Siteyi Görüntüle ](https://seromitschu.xyz) • [ 🐙 GitHub Deposu ](https://github.com/seromitschu/seromitschu.xyz)

<br>

<p align="center">
  <img src="https://img.shields.io/github/stars/seromitschu/seromitschu.xyz?style=for-the-badge&color=24292e&labelColor=0d1117&logo=github" alt="GitHub stars" />
  <img src="https://img.shields.io/github/forks/seromitschu/seromitschu.xyz?style=for-the-badge&color=24292e&labelColor=0d1117&logo=github" alt="GitHub forks" />
  <img src="https://img.shields.io/github/last-commit/seromitschu/seromitschu.xyz?style=for-the-badge&color=24292e&labelColor=0d1117&logo=git" alt="Last commit" />
  <img src="https://img.shields.io/github/languages/top/seromitschu/seromitschu.xyz?style=for-the-badge&color=24292e&labelColor=0d1117&logo=astro" alt="Top language" />
  <img src="https://img.shields.io/github/repo-size/seromitschu/seromitschu.xyz?style=for-the-badge&color=24292e&labelColor=0d1117" alt="Repo size" />
</p>

</div>

---

## ◈ Proje Amacı & Felsefesi

**seromitschu.xyz**, geleneksel, statik ve tek sayfadan oluşan sıkıcı "özgeçmiş (resume) siteleri" konseptini yıkmak amacıyla tasarlanmış kişisel bir **dijital sığınak ve interaktif portfolyo** projesidir.

### Temel Amacı:
* **Statik İçeriği Dinamikleştirmek:** Kullanıcıya yalnızca metin veya PDF formatında bilgi sunmak yerine; müzik, oyun, kodlama ve izleme alışkanlıklarını dış servis API'leri ile **gerçek zamanlı (real-time)** olarak siteye aktarmak.
* **Modüler Deneyim Sunmak:** Portfolyoyu tek bir kaydırma sayfasından çıkarıp; her bir ilgi alanı için özel tasarlanmış, gezilebilir **"tematik odalara"** bölerek akıcı bir kullanıcı deneyimi yaratmak.
* **Modern Web Mimarisi Gösterisi:** Astro Framework'ün Islands mimarisini, SSR (Server-Side Rendering) kabiliyetlerini, esnek backend API entegrasyonlarını ve dinamik CSS/UI animasyonlarını gerçek bir senaryoda sergilemek.

---

## ✦ Gelişmiş Özellikler & Konsept Odalar

Site içerisinde yer alan modüler odalar ve sistem altyapısı şu detaylı yeteneklere sahiptir:

* **🏠 Ana Sayfa (Giriş & Deneyim)** ── Kişisel biyografi, öne çıkan deneyimler, yetkinlikler ve genel tanıtım alanı.
* **📝 Blog Motoru** ── Astro Content Collections ile tip güvenli yönetilen, Markdown tabanlı içerik altyapısı. Hızlı okuma modları ve kategori filtreleme sunar.
* **🎵 Müzik Odası (Spotify & Apple Music)** ── Spotify API ve özel `/api/cover` uç noktası entegrasyonu ile o an dinlenen şarkıyı, son dinlenen albümleri ve müzik tercihlerini canlı gösterir.
* **🎮 Oyun Odası (Steam Integration)** ── Steam Web API üzerinden çekilen canlı verilerle toplam oynama süreleri, profil seviyesi, oynanan son oyunlar ve rozet/başarım sergisi.
* **🎬 Sinema Odası** ── İzlenen film ve dizilerin detaylı puanlama, arşiv ve izleme listesi formatında sergilendiği kişisel medya odası.
* **🖼️ Galeri** ── Dijital tasarımlar, görsel içerikler ve kişisel medya işlerinin sergilendiği yüksek performanslı medya galerisi.
* **💻 Geliştirme Odası (GitHub Live Data)** ── GitHub REST API senkronizasyonu ile en güncel depolar, yıldız sayıları, commit hareketliliği ve diller arası dağılım metrikleri.
* **📖 Guestbook (Ziyaretçi Defteri)** ── Supabase (PostgreSQL) veritabanı altyapısı ile ziyaretçilerin site üzerinde gerçek zamanlı olarak mesaj ve iz bırakabildiği etkileşimli alan.
* **⌘ Komut Paleti (`⌘K` / `Ctrl+K`)** ── Site genelinde çalışan klavye arama motoru. Statik rotalar, odalar ve blog yazıları arasında anında navigasyon imkanı sağlar.
* **🔔 Liquid Glass Popup Katmanı** ── Bağlantı kopyalama, form gönderimleri ve bildirimlerde beliren fiziki yay (spring) animasyonlarına sahip akışkan arayüz katmanı.
* **🧭 Akıllı Dock Navbar** ── Sayfa kaydırma yönü ve yüksekliğine göre küçülerek ikonik forma bürünen, dinamik genişleyebilir duyarlı navigasyon menüsü.

---

## ⚙ Mimari ve Teknolojiler

| Bileşen / Teknoloji | Mimari Rolü & Kullanım Amacı |
| :--- | :--- |
| **Astro** | Islands Architecture & SSR tabanlı ana framework |
| **TypeScript** | Statik tip denetimi ve güvenli kod mimarisi |
| **Supabase** | Guestbook sistemi için PostgreSQL veritabanı |
| **GitHub REST API** | Canlı geliştirme odası verileri |
| **Steam Web API** | Oyun odası profil, saat ve başarım verileri |
| **Spotify API** | Dinleme verileri ve kapak görseli arama uç noktası (`/api/cover`) |
| **Vercel** | Edge tabanlı sunucusuz hosting ve CI/CD otomasyonu |
| **Lucide React & Fira Mono** | Vektörel simge seti ve monospaced tipografi |

---

## 🛠 Kurulum ve Çalıştırma

### 1. Gereksinimler
* **Node.js**: `>= 22.12.0`
* **Package Manager**: `npm`

### 2. Adım Adım Kurulum

```bash
# 1. Depoyu klonlayın
git clone [https://github.com/seromitschu/seromitschu.xyz.git](https://github.com/seromitschu/seromitschu.xyz.git)

# 2. Proje dizinine geçin
cd seromitschu.xyz

# 3. Bağımlılıkları yükleyin
npm install

# 4. Geliştirme sunucusunu başlatın
npm run dev
