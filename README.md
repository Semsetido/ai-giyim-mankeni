# 🎨 AI Görsel İşleme Sistemi

Web tabanlı AI destekli görsel işleme ve Google Sheets entegrasyonu.

## 📋 Özellikler

- ✅ Fotoğraf yükleme (tıklama veya sürükle-bırak)
- ✅ AI ile görsel işleme (Replicate API - Google Nano Banana Pro)
- ✅ Google Sheets'e otomatik veri kaydetme
- ✅ Mobil uyumlu tasarım
- ✅ Gerçek zamanlı yükleme animasyonları

## 🚀 Nasıl Kullanılır?

### 1. Dosyaları Aç
`index.html` dosyasını tarayıcında aç (Chrome, Safari, Firefox)

### 2. Fotoğraf Yükle
- Yükleme alanına tıkla ve fotoğraf seç
- VEYA fotoğrafı sürükle-bırak

### 3. Bilgileri Gir
- **Adet**: Ürün adedi
- **Kalite**: A+, A, B veya C
- **Beden**: Ürün bedeni (M, L, XL vs.)

### 4. AI ile İşle
"✨ AI ile İşle" butonuna bas
- AI fotoğrafını işleyecek
- Ön ve arka görseller oluşturulacak

### 5. Kaydet
"💾 Google Sheets'e Kaydet" butonuna bas
- Veriler otomatik olarak Google Sheets'e kaydedilecek
- Sheets sayfası otomatik açılacak

## 📱 Mobil Kullanım

### Netlify ile (Önerilen - En Kolay)
1. `netlify.com` hesabı aç
2. "Add new site" > "Deploy manually"
3. Tüm dosyaları sürükle-bırak (`index.html`, `app.js`, `README.md`)
4. Otomatik bir URL verecek (örn: `https://benimapp.netlify.app`)
5. Bu URL'i telefonundan aç ve kullan! 🎉

### GitHub Pages ile
1. GitHub hesabı oluştur
2. Yeni repository oluştur (public)
3. Dosyaları yükle
4. Settings > Pages > Branch: main seç
5. Verilen URL'i kullan

### Python ile Lokal Test (Geliştirme)
```bash
# Proje klasöründe
python3 -m http.server 8000

# Tarayıcıda aç: http://localhost:8000
```

## 🔧 Yapılandırma

### app.js Dosyasındaki CONFIG
```javascript
const CONFIG = {
    REPLICATE_API_KEY: 'r8_bAiiRZkmcoMQ1xKPujrhwQlKMEaKLRc3ipJUa',
    REPLICATE_MODEL: 'google/nano-banana-pro',
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbz.../exec'
};
```

## 📊 Google Sheets Yapısı

| OnGorsel | ArkaGorsel | Adet | Kalite | Beden | Tarih |
|----------|------------|------|--------|-------|-------|
| URL      | URL        | 10   | A+     | L     | 25/02/2026 |

## ⚠️ Önemli Notlar

### Nano Banana Pro Modeli
Bu model **text-to-image** üretimi için tasarlanmış. Eğer farklı bir işlem yapmak istiyorsan (örneğin background removal, product photo enhancement), farklı bir model seçmelisin:

**Önerilen Alternatif Modeller:**
- `cjwbw/rembg` - Arkaplan silme
- `nightmareai/real-esrgan` - Görüntü iyileştirme
- `stability-ai/sdxl` - Görüntü üretimi

### Model Değiştirme
`app.js` dosyasında `REPLICATE_MODEL` değerini değiştir:
```javascript
REPLICATE_MODEL: 'cjwbw/rembg'  // Arkaplan silme için
```

### API Maliyetleri
- **Replicate**: İlk kullanımlar ücretsiz, sonrası ücretli
- **Google Sheets**: Tamamen ücretsiz
- **Google Apps Script**: Tamamen ücretsiz

### Güvenlik
- API keylerini gizli tut
- Public hosting yapıyorsan environment variables kullan
- Sadece güvendiğin kişilere link ver

## 🐛 Sorun Giderme

### "AI işleme hatası" alıyorum
- Replicate API key'ini kontrol et
- Model adının doğru olduğundan emin ol
- Replicate hesabında kredi olup olmadığını kontrol et

### "Google Sheets'e kayıt olmadı"
- Google Apps Script URL'ini kontrol et
- Apps Script'in "Anyone" erişimine açık olduğundan emin ol
- Tarayıcı konsolunda hata var mı bak

### Mobilde çalışmıyor
- HTTPS ile host edilmiş olmalı (HTTP değil)
- Netlify/GitHub Pages otomatik HTTPS veriyor

## 📞 Destek

Sorular için:
- Google Sheets: https://docs.google.com/spreadsheets/d/1_NNSHdXN04fws7Ni7FH66B7tKfBBRiERy8yefpmkEzs/edit
- Replicate Docs: https://replicate.com/docs

## 🎉 İyi Kullanımlar!

Sistem hazır! Artık her yerden kullanabilirsin. 🚀
