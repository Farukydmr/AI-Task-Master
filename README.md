# 🚀 AI TaskMaster Studio — Web Geliştirme & Yapay Zeka Projesi

TNC Group Web Geliştirme & Yapay Zeka Eğitim Programı proje yönergesi gereksinimlerine tam uyumlu olarak geliştirilmiş modern, modüler ve yapay zeka destekli görev ve proje yönetim stüdyosu.

![AI TaskMaster Studio Preview](public/screenshots/dashboard_preview.jpg)

---

## 📋 Proje Yönergesi Gereksinimleri ve Uyumluluk

| Yönerge Maddesi | Durum | Açıklama |
|---|:---:|---|
| **Modern JS Kütüphanesi** | ✅ Tamamlandı | **ReactJS 19** + **TypeScript** + **Vite** kullanıldı. |
| **LocalStorage Desteği** | ✅ Tamamlandı | Tüm CRUD işlemleri tarayıcı yerel depolaması (`localStorage`) ile anlık senkronizedir. JSON dışa/içe aktarma mevcuttur. |
| **Netlify Yayına Alma** | ✅ Tamamlandı | `netlify.toml` ve `public/_redirects` SPA ayarları yapıldı, yayına hazır. |
| **Dosya Ağaç Yapısı** | ✅ Tamamlandı | `components`, `pages`, `interfaces` ve `utils` klasör yapısı kuruldu. |
| **CSS Tercihi** | ✅ Tamamlandı | Sıfır harici CSS bağımlılığıyla **Pure CSS (Vanilla CSS)**, CSS Değişkenleri, Glassmorphism ve Google Fonts (`Outfit`, `Plus Jakarta Sans`) kullanıldı. |
| **CRUD: Ekleme (Create)** | ✅ Tamamlandı | `TaskFormModal` ve `AIAssistantModal` ile yeni görev ve prompt planı ekleme. |
| **CRUD: Listeleme (Read)** | ✅ Tamamlandı | Arama, kategori filtreleri (Yapay Zeka, Frontend, Backend, Tasarım), öncelik/durum filtreleme, sıralama ve istatistik kartları. |
| **CRUD: Güncelleme (Update)** | ✅ Tamamlandı | Görev içeriğini düzenleme (başlık, kategori, öncelik, tarih, etiketler) ve tek tıkla tamamlandı/bekliyor durumunu değiştirme. |
| **CRUD: Silme (Delete)** | ✅ Tamamlandı | `DeleteConfirmModal` ile onaylı kalıcı silme işlemi. |
| **Ekran Görüntüsü** | ✅ Tamamlandı | `public/screenshots/dashboard_preview.jpg` eklendi. |
| **GitHub Entegrasyonu** | ✅ Tamamlandı | Git reposu başlatıldı ve ilk commit hazırlandı. |

---

## 🛠️ Kullanılan Teknolojiler

- **Kütüphane & Çatı:** React 19, TypeScript
- **Derleme Aracı:** Vite 8.3
- **Stil & Tasarım:** Modern Pure CSS3 (CSS Variables, Glassmorphism, Micro-animations)
- **İkon Seti:** Lucide React
- **Efektler:** Canvas Confetti (Görev tamamlandığında kutlama parçacıkları)
- **Depolama:** Browser LocalStorage API

---

## 📁 Proje Klasör Mimarisi

```text
ai-task-master/
├── public/
│   ├── _redirects              # Netlify SPA yönlendirmesi
│   └── screenshots/
│       └── dashboard_preview.jpg  # Proje arayüz ekran görüntüsü
├── src/
│   ├── components/             # Yeniden kullanılabilir UI bileşenleri
│   │   ├── AIAssistantModal.tsx    # Yapay zeka prompt ve görev üreticisi
│   │   ├── DeleteConfirmModal.tsx  # Silme onay modalı
│   │   ├── FilterBar.tsx           # Arama, kategori çipleri ve sıralama
│   │   ├── Navbar.tsx              # Üst menü, tema değiştirici, JSON yedekleme
│   │   ├── StatsCards.tsx          # Anlık istatistik ve tamamlama oranı
│   │   ├── TaskCard.tsx            # Tekil görev kartı (tamamlama, düzenleme, silme)
│   │   └── TaskFormModal.tsx       # Görev ekleme ve güncelleme modalı
│   ├── interfaces/             # TypeScript tip ve arayüz tanımları
│   │   └── task.ts                 # ITask, ITaskFilter, ITaskStats tanımları
│   ├── pages/                  # Sayfa görünümleri
│   │   └── DashboardPage.tsx       # Ana kontrol paneli ve CRUD yönetimi
│   ├── utils/                  # Yardımcı fonksiyonlar
│   │   ├── aiGenerator.ts          # Prompt şablonları ve zeki görev motoru
│   │   ├── mockData.ts             # Başlangıç örnek görevleri
│   │   └── storage.ts              # LocalStorage ve JSON dışa/içe aktarımı
│   ├── App.css                 # Bileşen stilleri ve grid düzeni
│   ├── App.tsx                 # Ana uygulama kökü
│   ├── index.css               # Temel tasarım sistemi ve renk değişkenleri
│   └── main.tsx                # React DOM mount noktası
├── netlify.toml                # Netlify derleme ve dağıtım konfigürasyonu
├── package.json
└── tsconfig.json
```

---

## 💻 Yerel Kurulum ve Çalıştırma

Projeyi bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edin:

1. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

2. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```
   Tarayıcınızda [http://localhost:5173](http://localhost:5173) adresine gidin.

3. **Üretim (Production) Derlemesi Alın:**
   ```bash
   npm run build
   ```

---

## 🐙 GitHub'a Yükleme Adımları

1. GitHub hesabınızda yeni bir **Public** repo oluşturun (Örn: `ai-task-master`).
2. Terminalde proje klasöründeyken şu komutları çalıştırın:
   ```bash
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADINIZ/ai-task-master.git
   git push -u origin main
   ```

---

## 🌐 Netlify ile Yayına Alma (2 Kolay Yol)

### Yöntem 1: GitHub ile Otomatik Dağıtım (Önerilen)
1. [Netlify](https://app.netlify.com)'ye giriş yapın.
2. **"Add new site"** > **"Import an existing project"** seçeneğini tıklayın.
3. GitHub reponuzu seçin.
4. Ayarlar otomatik algılanacaktır:
   - **Build Command:** `npm run build`
   - **Publish directory:** `dist`
5. **"Deploy site"** butonuna basın. Birkaç saniye içinde siteniz canlıda!

### Yöntem 2: Sürükle & Bırak (Manual Deploy)
1. Projede `npm run build` komutunu çalıştırın.
2. Oluşan `dist` klasörünü Netlify panelindeki **"Sites" > "Drag & drop your site output folder here"** alanına sürükleyin.

---

## 🎓 Eğitmen & Kurum Bilgisi
- **Eğitim:** TNC Group — Web Geliştirme; Yapay Zeka Eğitim Programı
- **Eğitmen:** Onur Yalçın (`softwareonuryalcin@gmail.com`)
