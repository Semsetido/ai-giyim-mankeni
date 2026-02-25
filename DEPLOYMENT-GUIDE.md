# 🚀 DEPLOYMENT REHBERİ

Bu rehber, AI Görsel İşleme uygulamanızı **Railway** (backend) ve **Netlify** (frontend) üzerinde nasıl deploy edeceğinizi gösterir.

---

## 📦 GEREKLİ HESAPLAR

1. **Railway Hesabı**: https://railway.app
   - GitHub ile giriş yapın (ücretsiz)
   - $5 ücretsiz kredi veriliyor

2. **Netlify Hesabı**: https://netlify.com
   - GitHub ile giriş yapın (tamamen ücretsiz)

---

## 🔧 ADIM 1: BACKEND'İ RAILWAY'E DEPLOY ET

### 1.1 Railway'e Giriş Yapın
- https://railway.app adresine gidin
- "Login with GitHub" ile giriş yapın

### 1.2 Yeni Proje Oluşturun
1. "New Project" butonuna tıklayın
2. "Deploy from GitHub repo" seçeneğini seçin
3. Repository'nizi seçin (veya "Deploy from GitHub repo" yerine "Empty Project" seçin)

### 1.3 Backend Klasörünü Deploy Edin
1. "Empty Project" oluşturun
2. "GitHub Repo" seçeneğini seçin
3. Repository'nizi bağlayın
4. **Root Directory** olarak `/backend` klasörünü seçin
5. "Deploy Now" butonuna tıklayın

### 1.4 Backend URL'ini Kaydedin
- Deploy tamamlandıktan sonra, Railway size bir URL verecek
- Örnek: `https://ai-gorsel-backend-production.up.railway.app`
- **Bu URL'i kopyalayın!** (Frontend'de kullanacağız)

---

## 🌐 ADIM 2: FRONTEND'İ NETLIFY'A DEPLOY ET

### 2.1 Backend URL'ini Güncelle
1. `app.js` dosyasını açın
2. `YOUR_RAILWAY_URL_HERE` yazan yere Railway URL'inizi yapıştırın:

```javascript
BACKEND_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:5000'
    : 'https://ai-gorsel-backend-production.up.railway.app',  // ← Buraya yapıştır
```

### 2.2 Netlify'e Giriş Yapın
- https://netlify.com adresine gidin
- "Sign up" > "GitHub" ile giriş yapın

### 2.3 Site Deploy Edin
1. Netlify dashboard'da "Add new site" > "Deploy manually" seçin
2. Projenizin **kök klasörünü** (Absoulete/) sürükleyip bırakın
   - **DİKKAT**: `backend/` klasörünü EKLEMEYIN, sadece frontend dosyaları
3. Deploy tamamlanacak ve size bir URL verilecek
   - Örnek: `https://your-app-name.netlify.app`

### 2.4 (Opsiyonel) Domain Adını Değiştirin
- Netlify'da "Site settings" > "Change site name" ile özel bir isim verebilirsiniz
- Örnek: `ai-giyim-manken.netlify.app`

---

## ✅ ADIM 3: TEST EDİN

1. Netlify URL'inizi tarayıcıda açın
2. Ön ve arka görsel yükleyin
3. Giyim türünü seçin
4. "AI ile İyileştir" butonuna tıklayın
5. Görseller oluştuğunda "Google Sheets'e Kaydet" butonuna tıklayın

✨ **Artık PC'niz kapalı olsa bile uygulama çalışacak!**

---

## 💰 MALİYET TABLOSU

| Platform | Ücretsiz Limit | Sizin İçin Yeterli mi? |
|----------|----------------|------------------------|
| **Netlify** | 100GB/ay bandwidth | ✅ Evet (küçük kullanım) |
| **Railway** | $5 ücretsiz kredi | ✅ Evet (ay başı ~$0-2) |

**Not**: Railway kredi bittikten sonra kredi kartı ekleyebilirsiniz ($5-10/ay yeterli).

---

## 🐛 SORUN GİDERME

### Backend Hatası (500 Error)
- Railway dashboard'da "Logs" kısmına bakın
- SSL sertifika hatası varsa, `server.js`'te `rejectUnauthorized: false` olmalı

### Frontend Backend'e Bağlanamıyor (CORS)
- `app.js`'te `BACKEND_URL` doğru mu kontrol edin
- Railway URL'inde `https://` olduğundan emin olun

### Görseller Google Sheets'te Görünmüyor
- Google Apps Script'in düzgün çalıştığından emin olun
- Script URL'ini kontrol edin

---

## 📞 DESTEK

Sorun yaşarsanız:
1. Railway Logs'u kontrol edin
2. Browser Console'u açın (F12) ve hataları okuyun
3. Google Sheets'te IMAGE() formülünün çalıştığından emin olun
