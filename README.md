# seromitschu.xyz

Kişisel dijital sığınağım — klasik bir "özgeçmiş sitesi" değil, gerçek zamanlı API verileriyle beslenen, birden çok "oda"dan oluşan interaktif bir portfolyo deneyimi.

🔗 **Canlı site:** [seromitschu.xyz](https://seromitschu.xyz)

<p align="left">
  <img src="https://img.shields.io/github/stars/seromitschu/seromitschu.xyz?style=for-the-badge&color=f5f5f7&labelColor=0b0b0c" alt="GitHub stars" />
  <img src="https://img.shields.io/github/forks/seromitschu/seromitschu.xyz?style=for-the-badge&color=f5f5f7&labelColor=0b0b0c" alt="GitHub forks" />
  <img src="https://img.shields.io/github/last-commit/seromitschu/seromitschu.xyz?style=for-the-badge&color=f5f5f7&labelColor=0b0b0c" alt="Last commit" />
  <img src="https://img.shields.io/github/languages/top/seromitschu/seromitschu.xyz?style=for-the-badge&color=f5f5f7&labelColor=0b0b0c" alt="Top language" />
  <img src="https://img.shields.io/github/repo-size/seromitschu/seromitschu.xyz?style=for-the-badge&color=f5f5f7&labelColor=0b0b0c" alt="Repo size" />
</p>

## ✨ Özellikler

Site, klasik tek sayfalık portfolyoların ötesine geçip kendi içinde gezinilebilen "odalardan" oluşuyor:

- 🏠 **Ana Sayfa** — Giriş, hakkımda ve deneyim bölümleri
- 📝 **Blog** — Markdown tabanlı, content collections ile yönetilen yazı motoru
- 🎵 **Müzik Odası** — Spotify/Apple Music entegrasyonlu, dinleme alışkanlıklarını yansıtan interaktif alan
- 🎮 **Oyun Odası** — Steam Web API ile beslenen; oynanma süreleri, profil seviyesi ve başarımların gösterildiği bölüm
- 🎬 **Sinema Odası** — İzlenen film/dizi arşivinin sergilendiği alan
- 🖼️ **Galeri** — Görsel/tasarım arşivi
- 💻 **Geliştirme Odası** — GitHub REST API ile canlı beslenen repo, yıldız ve commit verileri
- 📖 **Guestbook** — Supabase (PostgreSQL) destekli, ziyaretçilerin gerçek zamanlı mesaj bırakabildiği ziyaretçi defteri
- ⌘ **Komut Paleti (⌘K / Ctrl+K)** — Klavye kısayoluyla açılan, statik rotalar ile blog yazılarını birlikte arayabildiğin global arama/navigasyon motoru
- 🔔 **Liquid Glass Popup Sistemi** — URL kopyalama, form gönderimi gibi olaylarda beliren yay animasyonlu bildirim katmanı
- 🧭 **Akıllı Dock Navbar** — Scroll yönüne göre küçülüp bir kalp ikonuna dönüşen, tekrar büyüyebilen menü çubuğu

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Kullanım Amacı |
|---|---|
| [Astro](https://astro.build) | Site oluşturma çatısı (Islands mimarisi, SSR) |
| [TypeScript](https://www.typescriptlang.org) | Tip güvenli geliştirme |
| [Supabase](https://supabase.com) | Guestbook için PostgreSQL veritabanı |
| GitHub REST API | Geliştirme odasındaki canlı repo verileri |
| Steam Web API | Oyun odasındaki profil ve oyun verileri |
| Spotify API | Müzik odası ve albüm kapağı arama (`/api/cover`) |
| [Vercel](https://vercel.com) | Deploy & hosting |
| [Lucide React](https://lucide.dev) | İkon kütüphanesi |
| Fira Mono | Tipografi |

## 🚀 Kurulum

```bash
git clone https://github.com/seromitschu/seromitschu.xyz.git
cd seromitschu.xyz
npm install
npm run dev
```

Site `http://localhost:4321` adresinde açılır.

### Ortam değişkenleri

Proje çalışması için bir `.env` dosyasına aşağıdaki değişkenlerin tanımlanması gerekir:

```bash
PUBLIC_NAME=
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=

GITHUB_TOKEN=
STEAM_API_KEY=
STEAM_ID=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=

LINK_GITHUB=
LINK_SPOTIFY=
LINK_LINKEDIN=
LINK_DISCORD=
```

### Diğer komutlar

```bash
npm run build      # Production build al
npm run preview    # Build'i lokalde önizle
npm run astro      # Astro CLI komutlarına erişim
```

> **Not:** Node.js `>=22.12.0` gereklidir.

## 📁 Proje Yapısı

```
seromitschu.xyz/
├── public/                  # Statik dosyalar
├── src/
│   ├── components/
│   │   ├── About.astro
│   │   ├── CinemaRoom.astro
│   │   ├── DevRoom.astro
│   │   ├── Experience.astro
│   │   ├── Footer.astro
│   │   ├── Gallery.astro
│   │   ├── GameRoom.astro
│   │   ├── GuestBook.astro
│   │   ├── Intro.astro
│   │   ├── MusicRoom.astro
│   │   ├── Navbar.astro      # Akıllı "dock" menü
│   │   ├── Popup.astro       # Global bildirim motoru
│   │   └── Reactions.astro
│   ├── content/blog/         # Markdown blog yazıları
│   ├── data/movies.json      # Sinema odası verisi
│   ├── layouts/Layout.astro  # Komut paleti, scrollbar, ana şablon
│   └── pages/
│       ├── api/               # github.ts, steam.ts, cover.ts, guestbook.ts
│       ├── blog/               # Dinamik blog rotaları
│       ├── index.astro
│       ├── music.astro
│       ├── games.astro
│       ├── cinema.astro
│       ├── gallery.astro
│       └── guestbook.astro
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🌐 Deploy

Proje [Vercel](https://vercel.com) üzerinden otomatik olarak deploy edilmektedir. `main` dalına yapılan her push, canlı siteye yansır.

## 📊 Repo İstatistikleri

<p align="left">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=seromitschu&repo=seromitschu.xyz&theme=dark_dimmed&hide_border=true" alt="Repo kartı" />
</p>

<p align="left">
  <img src="https://github-readme-stats.vercel.app/api?username=seromitschu&show_icons=true&theme=dark_dimmed&hide_border=true&count_private=true" alt="GitHub istatistikleri" width="48%" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=seromitschu&layout=compact&theme=dark_dimmed&hide_border=true" alt="En çok kullanılan diller" width="48%" />
</p>

> Bu kartlar [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) servisi üzerinden canlı olarak oluşturulur ve otomatik güncellenir.

## 📄 Lisans

Bu proje kişisel kullanım amaçlıdır. Kodu incelemek, ilham almak veya referans olarak kullanmak isterseniz çekinmeyin — ancak birebir kopyalayıp kendi adınıza yayınlamamanızı rica ederim 🙂

## 📬 İletişim

Site: [seromitschu.xyz](https://seromitschu.xyz)
GitHub: [@seromitschu](https://github.com/seromitschu)
