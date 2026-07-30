---
title: "seromitschu.xyz: Kişisel Portfolyomu Bir 'Ev'e Dönüştürmek"
date: 2026-07-30
tags: [astro, portfolyo, web-development, typescript]
---

# Kişisel Portfolyomu Bir "Ev"e Dönüştürmek

Bir süredir üzerinde çalıştığım kişisel sitem artık yayında: **[seromitschu.xyz](https://seromitschu.xyz)**. Baştan itibaren hedefim klasik bir "özgeçmiş sayfası" değil, gezinilebilen, kendi içinde odaları olan bir dijital ev kurmaktı. Bu yazıda hem teknik altyapıyı hem de sitenin öne çıkan bölümlerini anlatıyorum.

## Neden "Odalar"?

Standart bir portfolyo genelde tek sayfada; üstte hakkımda, altta projeler şeklinde ilerler. Ben bunun yerine siteyi ayrı "odalara" böldüm — her biri kendi amacına hizmet eden, kendi verisiyle beslenen bağımsız bir alan:

- 🏠 **Ana Sayfa** — Giriş, hakkımda ve deneyim özeti
- 📝 **Blog** — Şu an okuduğun gibi yazıların yayınlandığı, markdown tabanlı bölüm
- 🎵 **Müzik Odası** — Dinleme alışkanlıklarımı istatistiklere döken interaktif alan
- 🎮 **Oyun Odası** — Steam profilimden çekilen oynanma süresi, seviye ve başarım verileri
- 🎬 **Sinema Odası** — İzlediğim film ve dizilerin arşivlendiği köşe
- 🖼️ **Galeri** — Görsel ve tasarım denemelerimin sergilendiği alan
- 💻 **Geliştirme Odası** — GitHub'daki repolarımın canlı verilerle listelendiği vitrin
- 📖 **Guestbook** — Ziyaretçilerin gerçek zamanlı olarak iz bırakabildiği defter

Her oda ayrı bir sayfa, ama hepsi aynı tasarım dilini ve gezinme mantığını paylaşıyor.

## Canlı Veri: Statik Değil, Yaşayan Bir Site

Bu odaları sıradan portfolyolardan ayıran şey, çoğunun elle güncellenen değil, gerçek zamanlı API'lerle beslenen içerikler taşıması:

- **GitHub REST API**, Geliştirme Odası'ndaki repo, yıldız ve commit verilerini sunucu tarafında çekiyor.
- **Steam Web API**, Oyun Odası'na profil seviyemi ve oyun istatistiklerimi besliyor.
- **Spotify API**, Müzik Odası'ndaki parça ve albüm kapağı aramalarını çalıştırıyor.
- **Supabase (PostgreSQL)**, Guestbook'a gelen mesajları kalıcı olarak saklıyor — yani bıraktığın not, sayfayı yenilesen de kayboluyor.

## ⌘K: Klavyeden Her Yere Işınlanmak

Sitenin en sevdiğim parçalarından biri komut paleti. `Ctrl+K` (Mac'te `⌘K`) tuş kombinasyonuna bastığında ekranın ortasında bir arama kutusu açılıyor; buradan hem sabit sayfalara (Ana Sayfa, Müzik Odası, Galeri, Guestbook, Blog...) hem de tek tek blog yazılarına anında atlayabiliyorsun. Mobilde aynı işlevi navbar'daki arama butonu üstleniyor.

Arama, yazdığın anda sonuçları filtreliyor; dışarı tıklayınca da paleti sorunsuz şekilde kapatıyor — masaüstü uygulamalarındaki komut paletlerinden (VS Code, Raycast vb.) esinlenerek tasarladım.

## Küçük Ama Sevdiğim Detaylar

- **Akıllı Dock Navbar:** Aşağı kaydırdıkça küçülüp bir kalp ikonuna dönüşen, tekrar yukarı kaydırınca ya da o kalbe tıklayınca eski haline dönen menü çubuğu.
- **Liquid Glass Popup:** URL kopyalama gibi işlemlerde ekranın sağ üstünde beliren, yumuşak bir yay animasyonuyla açılıp kapanan bildirim kartı.

## Kullandığım Teknoloji Yığını

- **Astro** — Sayfa oluşturma ve render katmanı, gereksiz JavaScript yükü olmadan
- **TypeScript** — Tip güvenliği için
- **Supabase** — Guestbook'un veritabanı katmanı
- **Vercel** — Deploy; `main` dalına her push otomatik olarak canlıya yansıyor

## Sonraki Adımlar

Site benim için bitmiş bir ürün değil, sürekli üzerinde oynadığım bir proje. Yeni odalar, yeni entegrasyonlar ve küçük UI iyileştirmeleri yol haritamda duruyor.

Kodlara göz atmak istersen: **[github.com/seromitschu/seromitschu.xyz](https://github.com/seromitschu/seromitschu.xyz)**

<p align="left">
  <img src="https://img.shields.io/github/stars/seromitschu/seromitschu.xyz?style=for-the-badge&color=f5f5f7&labelColor=0b0b0c" alt="GitHub stars" />
  <img src="https://img.shields.io/github/forks/seromitschu/seromitschu.xyz?style=for-the-badge&color=f5f5f7&labelColor=0b0b0c" alt="GitHub forks" />
  <img src="https://img.shields.io/github/last-commit/seromitschu/seromitschu.xyz?style=for-the-badge&color=f5f5f7&labelColor=0b0b0c" alt="Last commit" />
</p>

<p align="left">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=seromitschu&repo=seromitschu.xyz&theme=dark_dimmed&hide_border=true" alt="Repo kartı" />
</p>

---

*Sorunuz ya da geri bildiriminiz varsa Guestbook'a bir not bırakabilir ya da benimle doğrudan iletişime geçebilirsiniz.*
