# 🚀 Backend API

AI Görsel İşleme Sistemi için backend API servisi.

## 📦 Kurulum

```bash
cd backend
npm install
```

## ▶️ Çalıştırma

```bash
npm start
```

Backend şu adreste çalışacak: **http://localhost:5000**

## 🔗 Endpoints

### 1. Health Check
```
GET /
```

### 2. Prediction Oluştur
```
POST /api/replicate/predict

Body:
{
  "apiKey": "your_replicate_api_key",
  "model": "google/nano-banana-pro",
  "input": {
    "prompt": "...",
    "image_input": ["base64..."],
    "resolution": "2K",
    "aspect_ratio": "4:5",
    "output_format": "png"
  }
}
```

### 3. Prediction Durumu
```
GET /api/replicate/prediction/:id

Headers:
Authorization: Bearer your_replicate_api_key
```

## 🔧 Teknik Detaylar

- **Express.js**: Web framework
- **CORS**: Cross-origin isteklere izin verir
- **node-fetch**: HTTP istekleri için

## 🌐 Production Deployment

### Heroku (Ücretsiz)
```bash
heroku create your-app-name
git push heroku main
```

### Railway (Ücretsiz)
1. railway.app'e git
2. GitHub'ı bağla
3. Deploy!

### Vercel (Ücretsiz)
```bash
vercel deploy
```

Production'da `CONFIG.BACKEND_URL`'i güncelle:
```javascript
BACKEND_URL: 'https://your-app.herokuapp.com'
```
