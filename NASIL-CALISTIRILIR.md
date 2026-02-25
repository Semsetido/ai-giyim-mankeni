# 🚀 AI Görsel İşleme Sistemi - Çalıştırma Rehberi

## ⚡ HIZLI BAŞLANGIÇ

### 1️⃣ Backend'i Başlat

**Terminal 1'de:**
```bash
cd /Users/mac_1/Desktop/Absoulete/backend
npm install
npm start
```

✅ Backend çalışacak: `http://localhost:5000`

---

### 2️⃣ Frontend'i Başlat

**Terminal 2'de:**
```bash
cd /Users/mac_1/Desktop/Absoulete
python3 -m http.server 8000
```

✅ Frontend çalışacak: `http://localhost:8000`

---

### 3️⃣ Tarayıcıda Aç

```
http://localhost:8000
```

---

## 📁 Proje Yapısı

```
Absoulete/
├── index.html              # Ana sayfa
├── app.js                  # Frontend JavaScript
├── mannequins/             # Manken görselleri
│   ├── ust-giyim-manken.png
│   ├── alt-giyim-manken.png
│   └── elbise-manken.png
└── backend/                # Backend API
    ├── server.js           # API servisi
    ├── package.json
    └── README.md
```

---

## 🎯 Kullanım

1. **2 Kıyafet Görseli Yükle**
   - Ön kıyafet fotoğrafı
   - Arka kıyafet fotoğrafı

2. **Giyim Türü Seç**
   - 👕 Üst Giyim
   - 👖 Alt Giyim
   - 👗 Elbise

3. **AI ile İyileştir**
   - Bekle (2-4 dakika)
   - Ön ve arka manken görselleri oluşacak

4. **Bilgileri Gir**
   - Adet
   - Kalite
   - Beden

5. **Kaydet**
   - Google Sheets'e otomatik kaydedilir

---

## 🔧 Sorun Giderme

### Backend çalışmıyor
```bash
cd backend
npm install
npm start
```

### Frontend çalışmıyor
```bash
python3 -m http.server 8000
```

### CORS hatası alıyorum
- Backend'in çalıştığından emin ol (`http://localhost:5000`)
- Her iki terminal de açık olmalı

### Görseller yüklenmiyor
- `mannequins/` klasöründe 3 PNG dosyası olmalı:
  - ust-giyim-manken.png
  - alt-giyim-manken.png
  - elbise-manken.png

---

## 🌐 Production Deployment

### Backend (Heroku)
```bash
cd backend
heroku create
git push heroku main
```

### Frontend (Netlify)
1. `netlify.com` → "Add new site"
2. Dosyaları sürükle-bırak
3. `app.js`'de BACKEND_URL'i güncelle:
   ```javascript
   BACKEND_URL: 'https://your-app.herokuapp.com'
   ```

---

## 📞 Yardım

Sorun mu var? Konsolu kontrol et:
- Tarayıcıda F12 → Console
- Terminal'lerde hata mesajlarına bak

---

## ✨ Özellikler

- ✅ CORS sorunu yok (Backend API sayesinde)
- ✅ Güvenli (API keyler tarayıcıda görünmez)
- ✅ Profesyonel yapı
- ✅ Production'a hazır
- ✅ App Store/Google Play uyumlu
