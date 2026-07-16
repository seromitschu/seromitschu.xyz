---
title: "Derinlemesine seromitschu.xyz Teknolojik ve Tasarımsal Anatomisi"
description: "Astro, Supabase, Steam, GitHub ve Spotify API katmanlarıyla örülmüş, yüksek kontrastlı sıvı cam estetiğine sahip kişisel bir dijital sığınağın uçtan uca mimari incelemesi."
pubDate: 2026-07-07
tags: ["webdev", "ui-ux", "astro", "supabase", "api-integration"]
---

Kişisel bir web sitesi sadece statik bir özgeçmiş veya dijital bir kartvizit değildir. Bir arayüz tasarımcısı ve web geliştiricisi için burası; internetin gürültüsünden uzaklaştığı, tüm piksellerin kontrolünü eline aldığı ve modern teknolojileri sınırlara kadar zorladığı deneysel bir oyun alanıdır. 

**seromitschu.xyz** projesini hayata geçirirken temel felsefem; Apple esintili yüksek kontrastlı minimalizmi, akışkan cam (Liquid Glass) dokularıyla harmanlamak ve tarayıcıya minimum yük bendiren, veri odaklı, yaşayan bir ekosistem inşa etmekti.

Bu teknik analiz yazısında; sitenin tasarım sistematiğinden gerçek dosya hiyerarşisine, API veri katmanlarından kalıcı veritabanı çözümlerine ve en yeni **interaktif popup bildirim motoruna** kadar tüm detayları kaynak kodlarıyla birlikte döküyorum.

---

## 1. Mimari Yapı ve Dosya Hiyerarşisi (`/src`)

Projenin kalbi, bileşen tabanlı (component-driven) ve sunucu taraflı derleme (Static Site Generation / SSR) avantajlarını bir arada sunan **Astro Framework** ile atıyor. Gereksiz hiçbir istemci tarafı (client-side) JavaScript yükü oluşturmamak adına adacık mimarisi (Astro Islands) kullanılıyor.

Sitenin genel dizin ağacı ve veri akış şeması şu şekildedir:


```

src/
├── components/
│   ├── Navbar.astro         # Akıllı küçülen / büyüyen Apple Dock menüsü
│   └── Popup.astro          # Global yay animasyonlu bildirim motoru
├── layouts/
│   └── Layout.astro         # Komut paleti, custom scrollbar ve ana şablon
└── pages/
├── index.astro          # Yaş sayaçlı ana sayfa modülü
├── dev.astro            # GitHub API tabanlı geliştirme odası
├── music.astro          # Spotify/Apple Music entegreli müzik odası
├── gallery.astro        # Tasarım ve resim arşivi galeri sayfası
├── guestbook.astro      # Supabase tabanlı canlı ziyaretçi defteri
└── blog/
└── [slug].astro     # Dinamik markdown blog yazıları motoru

```

---

## 2. Tasarım Sistematiği: Mutlak Karanlık ve Küresel Değişkenler

Sitenin görsel evreni **saf siyah (#0b0b0c)** bir uzay üzerine kuruldu. Bu mutlak karanlığın içinde derinlik, katmanlaşma ve fiziksel bir temas hissi uyandırmak amacıyla **Liquid Glass** arayüz mimarisi ve Apple standartlarında CSS değişkenleri (`:root`) kurgulandı:

```css
:root {
  --bg-color: #0b0b0c;
  --text-primary: #f5f5f7;
  --text-secondary: #86868b;
  --apple-card-bg: rgba(22, 22, 24, 0.6);
  --apple-border: rgba(255, 255, 255, 0.08);
}

```

### Işığı Kıran Buzlu Cam Dokusu (Backdrop Blurry)

Bileşenlerin (Navigasyon barı, komut paleti ve popup'lar) arka planları ham bir opaklık veya basit bir transparanlık yerine, ışığı kıran gerçekçi bir cam katmanı gibi davranır:

```css
.liquid-glass-effect {
  background: var(--apple-card-bg);
  border: 1px solid var(--apple-border);
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.4), 
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
}

```

Bu CSS mimarisindeki `inset` gölge katmanı, bileşenlerin üst sınırına mikro düzeyde bir ışık çizgisi vurarak camın keskin kenarlarını ve derinliğini simüle eder.

---

## 3. Sayfa Yapısı ve İşlevsel Katmanlar

Site, kullanıcının veri tüketim senaryolarına göre optimize edilmiş ve Astro'nun esnek yönlendirme (routing) sistemini kullanan ana odalardan meydana gelir:

1. **Ana Sayfa (Home - `index.astro`):** Giriş kapısı. Minimalist bir karşılama metni, sürekli aktif olan dinamik bir yaş sayacı ve dijital kimliğimin kısa bir özeti.
2. **Geliştirme Odası & Projeler (`dev.astro`):** Üzerinde çalıştığım açık kaynaklı araçların, kütüphanelerin ve teknik pratiklerin sergilendiği yazılım vitrini. GitHub API verileriyle anlık olarak beslenir.
3. **Müzik Odası (`music.astro`):** Müzikle olan bağımı istatistiksel birer çıktıya dönüştüren interaktif alan. Standart müzik listelerinin ötesinde, dinleme alışkanlıklarımı yansıtan dinamik veri blokları sergilenir.
4. **Görsel Arşiv ve Galeri (`gallery.astro`):** Bir arayüz tasarımcısı olarak estetik algımı yansıtan, yüksek çözünürlüklü görsellerin, minimalist arayüz denemelerinin ve görsel keşiflerin toplandığı galeri sayfası. Astro'nun optimize edilmiş görsel işleme motorunu kullanır.
5. **Canlı Ziyaretçi Defteri (`guestbook.astro`):** Sitenin dış dünya ile doğrudan ve kalıcı olarak etkileşime girdiği canlı hat. Ziyaretçiler sisteme kendi adlarını ve dijital izlerini bırakabilirler.

---

## 4. Canlı Veri Akışları ve API Entegrasyonları

seromitschu.xyz'i geleneksel, statik portfolyolardan ayıran en temel unsur; arka planda benim gerçek hayattaki dijital ayak izlerimle senkronize çalışan asenkron API ağlarıdır.

### GitHub API ile Canlı Geliştirici Metrikleri

Geliştirme odasındaki repolar ve commit geçmişleri elle yazılmış veriler değildir. **GitHub REST API** üzerinden çekilen canlı verilerle, repoların güncel yıldız (star) sayıları, açık issues durumları, son güncelleme zamanları ve aktif çalışma saatleri sunucu taraflı (SSR) işlenerek listelenir.

### Steam Web API ile Oyuncu Profil Analizi

Oyun odasındaki veriler, **Steam Web API** aracılığıyla doğrudan profilimden doğrulanır. Kütüphanemdeki oyunların toplam oynanma süreleri, profil seviyem ve oyunlarda kazandığım en güncel başarımlar (achievements) dinamik veri nesneleri halinde arayüze beslenir.

### Spotify & Apple Music API: Döngü (Repeat) Motoru

Müzik Odası, klasik "En Çok Dinlenen 10 Şarkı" şablonunu kırar. Geliştirdiğim özel entegrasyon, API'dan gelen ham çalma geçmişi verisini analiz eder; toplam dinleme dakikasından ziyade, son dönemde **hangi parçayı kaç kez üst üste döngüye (repeat count)** aldığımı hesaplar ve parçanın popülerlik ritmini çıkarır.

### Supabase ile Canlı Veritabanı Katmanı

Ziyaretçilerin siteye anı bırakmasını sağlayan Guestbook bileşeni, tarayıcı hafızası yerine buluttaki **Supabase PostgreSQL** veritabanına doğrudan bağlıdır. Bir kullanıcı mesaj gönderdiğinde veri katmanı şu asenkron fonksiyonla işlenir:

```typescript
// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Ziyaretçi Defterine Yeni Mesaj Ekleme Fonksiyonu
export async function insertGuestbookMessage(username: string, message: string) {
  const { data, error } = await supabase
    .from('guestbook')
    .insert([{ name: username, body: message, created_at: new Date() }]);
    
  if (error) {
    console.error("Veritabanı yazma hatası:", error.message);
    throw error;
  }
  return data;
}

```

---

## 5. Küresel Mikro Etkileşimler ve `Layout.astro` Çekirdeği

Sitenin en karmaşık yapılarından biri olan global düzen (`Layout.astro`), hem statik navigasyonu yönetir hem de dinamik blog yazılarını (`getCollection`) derleyerek entegre komut paletine besler.

### Akıllı Navigasyon (The Dock Mimarisi)

Ekranın altında konumlanan menü barı, ekran alanını maksimum verimlilikle korumak amacıyla kullanıcının kaydırma (scroll) yönünü ve hızını anlık olarak dinler. Sayfa aşağı kaydırıldığında yumuşak bir biçim değiştirme (morphing) animasyonuyla `46x46px` boyutlarında bir **kalp ikonuna (❤️)** dönüşerek köşeye çekilir. Kullanıcı yukarı kaydırdığında veya bu kalbe tıkladığında ise eski geniş, işlevsel formuna esneyerek geri döner.

### Çakışmasız Komut Paleti (⌘K Arama Motoru)

Klavye kullanıcıları için `⌘K` / `Ctrl+K` kombinasyonlarıyla, mobil kullanıcılar için ise navbardaki arama butonuyla tetiklenen **Command Palette**, projedeki statik rotaları ve dinamik içerikleri harmanlar:

```typescript
// Layout.astro Ön Yüz Derleme Mantığı
import { getCollection } from 'astro:content';

const navigationItems = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Geliştirme / Projeler', href: '/dev' },
  { name: 'Müzik Odası', href: '/music' },
  { name: 'Galeri', href: '/gallery' },
  { name: 'Ziyaretçi Defteri', href: '/guestbook' },
  { name: 'Blog', href: '/blog' }
];

const blogPosts = await getCollection('blog');
const sortedPosts = blogPosts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

```

Gelişmiş filtreleme motoru girilen girdiyi milisaniyeler içinde eşleştirir. JavaScript katmanındaki `e.stopPropagation()` entegrasyonu sayesinde harici tıklamalar (click-away) ile navbar butonunun tetikleme sinyalleri izole edilmiş, çift tetiklenme (anlık açılıp kapanma) hatası kökten çözülmüştür.

---

## 6. Yeni Nesil Premium Modül: Liquid Glass Popup Sistemi

Sitenin en yeni interaktif üyesi, ekranın sağ üst köşesinde Apple kalitesinde bir yay (Spring) animasyonuyla beliren **Liquid Glass Popup** bildirim motorudur. Bu sistem, sitedeki tüm asenkron olayları (URL kopyalama, başarılı veritabanı kayıtları veya gizli komut keşifleri) kullanıcıya bildirmek amacıyla global bir fonksiyon (`window.showPopup`) mimarisi kullanır.

### PopUp Core CSS ve Mobil Uyum Sırrı

Popup, masaüstü ekranlarda sağ üst köşede kompakt ve şık bir kart (`320px`) olarak konumlanırken; küçük ekranlı mobil cihazlarda (`max-width: 480px`) ekran kenarlarından taşma yapmaması ve dokunmatik alanını koruması için esnek bir genişliğe (`width: auto`) ve dengeli çıpalara adapte olur:

```css
/* src/components/Popup.astro - Core Styling */
.popup-toast {
  position: fixed;
  top: 2rem;
  right: 2rem;
  width: 320px;
  z-index: 100000;
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
  transition: 
    opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.popup-toast.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Mobil Ekranlar İçin Akışkan Esneklik Katmanı */
@media (max-width: 480px) {
  .popup-toast {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    width: auto;
  }
}

```

### Uygulama Senaryosu: Komut Paletinden URL Kopyalama Tetikleyicisi

Bu sistemin sitedeki en şık entegrasyonu, Komut Paletindeki "URL Kopyala" işlevine atanmıştır. Kullanıcı panoya adresi aldığında, eski düz metin uyarısı yerine tasarladığımız akışkan popup ekrana fırlatılır:

```javascript
// src/layouts/Layout.astro - Komut Paleti Click İşleyicisi
} else if (item.id === 'cmd-copy-url') {
  // Tarayıcı panosuna adresi yaz
  navigator.clipboard.writeText(window.location.href);
  
  // Küresel popup motorunu kusursuz parametrelerle çağır
  window.showPopup(
    "Bağlantı Kopyalandı", 
    "Sanal adres panoya başarıyla kaydedildi. Doğrudan paylaşabilirsiniz.", 
    "🔗", 
    4000
  );
  
  // Palet penceresini yumuşakça kapat
  setTimeout(() => togglePalette(false), 300);
}

```

---

## 7. Sitenin Görsel ve İşlevsel Mimarisi

Aşağıdaki yapısal şema, kullanıcının sitede gezindiği andan itibaren arka plandaki API ağlarının ve interaktif bileşenlerin (Palet, Navbar ve Popup) birbiriyle nasıl bir uyum içinde çalıştığını özetlemektedir:

```
[Kullanıcı Arayüzü: seromitschu.xyz]
        │
        ├──► [Astro SSR / Statik Sayfa Motoru] ──► (index, dev, music, gallery, blog)
        │
        ├──► [Canlı API Veri Entegrasyonları]
        │         ├───► GitHub API (Canlı Commit & Repo Yıldızları)
        │         ├───► Steam API (Profil Seviyesi & Oyun Saatleri)
        │         └───► Spotify API (Anlık Parça & Repeat Sayacı)
        │
        ├──► [Kalıcı Veritabanı Hattı] ──► Supabase PostgreSQL (Guestbook Mesajları)
        │
        └──► [Global İnteraktif Bileşenler]
                  ├───► Akıllı Menü Barı (The Dock - ❤️ Morphing Efekti)
                  ├───► Komut Paleti (⌘K Arama Motoru)
                  └──► Liquid Glass Popup ( window.showPopup() Bildirim Sistemi)

```

## Sonuç

`seromitschu.xyz`, ham tasarım gücünün optimize edilmiş asenkron kod mimarisiyle birleştiğinde web portfolyolarının ne denli güçlü birer yaşayan organizmaya dönüşebileceğinin somut bir manifestosudur.

**Astro Framework**'ün sağladığı hafiflik ve bağımsız API katmanlarının esnekliği sayesinde, sunucuya yardımı dokunacak tek bir milisaniye dahi gereksiz yük bindirmeden internetteki en kusursuz sığınağımı inşa etmeye ve genişletmeye devam ediyorum.

Gözünüz komut satırında ve sağ üst köşedeki akışkan bildirim parıltılarında olsun!

```

```