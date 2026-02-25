# 🚂 RAILWAY DEPLOYMENT ADIM ADIM

## Seçenek 1: Railway Web Üzerinden (En Kolay)

### Adım 1: Railway Hesabı Oluşturun
1. https://railway.app adresine gidin
2. "Start a New Project" butonuna tıklayın
3. "Login with GitHub" ile giriş yapın

### Adım 2: Backend'i Yükleyin
1. "Deploy from GitHub repo" YERİNE "Empty Project" seçin
2. "New" > "Empty Service" tıklayın
3. Açılan servise tıklayın

### Adım 3: Dosyaları Manuel Yükleyin
1. Service sayfasında "Settings" sekmesine gidin
2. "Source" bölümünde "Deploy" seçeneğini bulun
3. **DİREKT DOSYA YÜKLEYEMEZSİNİZ**, bu yüzden GitHub'a yüklemeniz gerekiyor

## Seçenek 2: GitHub ile Deploy (Önerilen)

### Adım 1: Projenizi GitHub'a Yükleyin

1. Terminal'de şunu çalıştırın:
```bash
cd /Users/mac_1/Desktop/Absoulete
git init
git add .
git commit -m "Initial commit - AI Giyim Mankeni"
```

2. GitHub'da yeni bir repository oluşturun:
   - https://github.com/new
   - Repository adı: `ai-giyim-mankeni`
   - Private/Public seçin
   - "Create repository" butonuna tıklayın

3. Terminal'de GitHub'a push edin:
```bash
git remote add origin https://github.com/KULLANICI_ADINIZ/ai-giyim-mankeni.git
git branch -M main
git push -u origin main
```

### Adım 2: Railway'de Repo'yu Bağlayın

1. Railway'de "New Project" > "Deploy from GitHub repo"
2. Repository'nizi seçin
3. **ROOT DIRECTORY** olarak `backend` yazın
4. "Deploy Now" butonuna tıklayın

### Adım 3: Backend URL'ini Alın

1. Deploy tamamlandıktan sonra, "Settings" > "Domains" gidin
2. "Generate Domain" butonuna tıklayın
3. Oluşan URL'i kopyalayın (örn: `https://ai-gorsel-backend-production.up.railway.app`)

---

## 🌐 NETLIFY DEPLOYMENT ADIM ADIM

### Adım 1: Backend URL'ini Güncelle

`app.js` dosyasında şu satırı düzenleyin:

```javascript
BACKEND_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:5000'
    : 'https://RAILWAY_URL_BURAYA',  // ← Railway URL'inizi buraya yapıştır
```

### Adım 2: Netlify'e Deploy Edin

#### YÖNTEM A: Drag & Drop (En Kolay)

1. https://app.netlify.com adresine gidin
2. "Add new site" > "Deploy manually"
3. **Sadece şu dosyaları** sürükleyip bırakın:
   - `index.html`
   - `style.css`
   - `app.js`
   - `mannequins/` klasörü (tüm png dosyalarıyla)

**DİKKAT**: `backend/` klasörünü EKLEMEYIN!

#### YÖNTEM B: GitHub ile (Otomatik Update)

1. GitHub repo'nuzu Netlify'e bağlayın
2. "Build settings":
   - Base directory: `/` (root)
   - Publish directory: `/` (root)
3. "Deploy site" butonuna tıklayın

### Adım 3: Test Edin

1. Netlify size verdiği URL'i açın (örn: `https://ai-giyim-mankeni.netlify.app`)
2. Görsel yükleyin ve test edin

---

## ✅ TAMAMLANDI!

Artık uygulamanız 7/24 çalışıyor!

- **Frontend**: Netlify'de (ücretsiz)
- **Backend**: Railway'de (~$5/ay)
- **Google Sheets**: Her zaman aktif

PC'nizi kapatabilirsiniz! 🎉
