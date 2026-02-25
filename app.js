// ⚠️ REPLICATE VE GOOGLE APPS SCRIPT BİLGİLERİ
const CONFIG = {
    // Backend API URL - Otomatik olarak doğru URL'i seçer
    BACKEND_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:5000'  // Local development
        : 'https://ai-giyim-mankeni-production.up.railway.app',  // Production (Railway)
    
    // Replicate API Token
    REPLICATE_API_KEY: 'r8_UtBmk4SkBr1nWB0UhNC7iV3PhmTBkrJ07Bdwn',
    
    // Replicate Model (google/nano-banana-pro)
    REPLICATE_MODEL: 'google/nano-banana-pro',
    
    // Google Apps Script URL
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzGJmSmrtxMtbcThceTgRmRzQQrdsHAiF5QKVdCg8DMspO2QfP23noxZCaWJTJCSoaQ/exec',
    
    // Manken Görselleri
    MANNEQUINS: {
        'Üst Giyim': 'mannequins/ust-giyim-manken.png',
        'Alt Giyim': 'mannequins/alt-giyim-manken.png',
        'Elbise': 'mannequins/elbise-manken.png'
    }
};

// Global değişkenler
let uploadedFrontFile = null;
let uploadedBackFile = null;
let selectedGiyimTuru = null;
let imageUrls = {
    onGorsel: '',
    arkaGorsel: ''
};

// DOM elementlerini al
const uploadAreaFront = document.getElementById('uploadAreaFront');
const uploadAreaBack = document.getElementById('uploadAreaBack');
const fileInputFront = document.getElementById('fileInputFront');
const fileInputBack = document.getElementById('fileInputBack');
const fileInputFrontCamera = document.getElementById('fileInputFrontCamera');
const fileInputBackCamera = document.getElementById('fileInputBackCamera');
const previewFront = document.getElementById('previewFront');
const previewBack = document.getElementById('previewBack');
const aiBtn = document.getElementById('aiBtn');
const saveBtn = document.getElementById('saveBtn');
const loading = document.getElementById('loading');
const aiResults = document.getElementById('aiResults');
const result = document.getElementById('result');

// Modal elementleri
const uploadModal = document.getElementById('uploadModal');
const modalCameraBtn = document.getElementById('modalCameraBtn');
const modalGalleryBtn = document.getElementById('modalGalleryBtn');
const modalCloseBtn = document.getElementById('modalCloseBtn');

// Modal için hangi input kullanılacak (front/back)
let currentUploadType = null;

// Giyim türü butonları
const ustGiyimBtn = document.getElementById('ustGiyimBtn');
const altGiyimBtn = document.getElementById('altGiyimBtn');
const elbiseBtn = document.getElementById('elbiseBtn');

// Modal buton olayları
modalCameraBtn.addEventListener('click', () => {
    uploadModal.classList.remove('active');
    if (currentUploadType === 'front') {
        fileInputFrontCamera.click();
    } else if (currentUploadType === 'back') {
        fileInputBackCamera.click();
    }
});

modalGalleryBtn.addEventListener('click', () => {
    uploadModal.classList.remove('active');
    if (currentUploadType === 'front') {
        fileInputFront.click();
    } else if (currentUploadType === 'back') {
        fileInputBack.click();
    }
});

modalCloseBtn.addEventListener('click', () => {
    uploadModal.classList.remove('active');
    currentUploadType = null;
});

// Modal dışına tıklanınca kapat
uploadModal.addEventListener('click', (e) => {
    if (e.target === uploadModal) {
        uploadModal.classList.remove('active');
        currentUploadType = null;
    }
});

// Giyim türü buton tıklama olayları
ustGiyimBtn.addEventListener('click', () => {
    selectedGiyimTuru = 'Üst Giyim';
    ustGiyimBtn.classList.add('active');
    altGiyimBtn.classList.remove('active');
    elbiseBtn.classList.remove('active');
});

altGiyimBtn.addEventListener('click', () => {
    selectedGiyimTuru = 'Alt Giyim';
    altGiyimBtn.classList.add('active');
    ustGiyimBtn.classList.remove('active');
    elbiseBtn.classList.remove('active');
});

elbiseBtn.addEventListener('click', () => {
    selectedGiyimTuru = 'Elbise';
    elbiseBtn.classList.add('active');
    ustGiyimBtn.classList.remove('active');
    altGiyimBtn.classList.remove('active');
});

// ÖN GÖRSEL - Dosya yükleme olayları
uploadAreaFront.addEventListener('click', () => {
    currentUploadType = 'front';
    uploadModal.classList.add('active');
});

fileInputFront.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFile(file, 'front');
    }
});

fileInputFrontCamera.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFile(file, 'front');
    }
});

uploadAreaFront.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadAreaFront.classList.add('dragover');
});

uploadAreaFront.addEventListener('dragleave', () => {
    uploadAreaFront.classList.remove('dragover');
});

uploadAreaFront.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadAreaFront.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handleFile(file, 'front');
    }
});

// ARKA GÖRSEL - Dosya yükleme olayları
uploadAreaBack.addEventListener('click', () => {
    currentUploadType = 'back';
    uploadModal.classList.add('active');
});

fileInputBack.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFile(file, 'back');
    }
});

fileInputBackCamera.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFile(file, 'back');
    }
});

uploadAreaBack.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadAreaBack.classList.add('dragover');
});

uploadAreaBack.addEventListener('dragleave', () => {
    uploadAreaBack.classList.remove('dragover');
});

uploadAreaBack.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadAreaBack.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handleFile(file, 'back');
    }
});

// Dosya işleme fonksiyonu
function handleFile(file, type) {
    if (type === 'front') {
        uploadedFrontFile = file;
        
        // Önizleme göster
        const reader = new FileReader();
        reader.onload = (e) => {
            previewFront.src = e.target.result;
            previewFront.style.display = 'block';
            uploadAreaFront.classList.add('has-image');
        };
        reader.readAsDataURL(file);
        
    } else if (type === 'back') {
        uploadedBackFile = file;
        
        // Önizleme göster
        const reader = new FileReader();
        reader.onload = (e) => {
            previewBack.src = e.target.result;
            previewBack.style.display = 'block';
            uploadAreaBack.classList.add('has-image');
        };
        reader.readAsDataURL(file);
    }
    
    // Her iki görsel de yüklendiyse AI butonunu aktif et
    if (uploadedFrontFile && uploadedBackFile) {
        aiBtn.disabled = false;
    }
}

// AI İşleme Butonu (Opsiyonel - Görselleri AI ile iyileştir)
aiBtn.addEventListener('click', async () => {
    if (!uploadedFrontFile || !uploadedBackFile) {
        showMessage('Lütfen hem ön hem de arka kıyafet görsellerini yükleyin!', 'error');
        return;
    }
    
    // Giyim türünü kontrol et
    if (!selectedGiyimTuru) {
        showMessage('Lütfen giyim türünü seçin!', 'error');
        return;
    }
    
    // Butonları devre dışı bırak
    aiBtn.disabled = true;
    saveBtn.disabled = true;
    
    // Yükleme animasyonunu göster
    loading.style.display = 'block';
    aiResults.style.display = 'none';
    result.style.display = 'none';
    
    try {
        console.log('=== AI İŞLEME BAŞLADI ===');
        console.log('Giyim Türü:', selectedGiyimTuru);
        
        // ÖN ve ARKA kıyafet görsellerini base64'e çevir
        console.log('Ön kıyafet görseli yükleniyor...');
        const onKiyafetBase64 = await fileToBase64(uploadedFrontFile);
        console.log('Ön kıyafet base64 boyutu:', onKiyafetBase64.length);
        
        console.log('Arka kıyafet görseli yükleniyor...');
        const arkaKiyafetBase64 = await fileToBase64(uploadedBackFile);
        console.log('Arka kıyafet base64 boyutu:', arkaKiyafetBase64.length);
        
        // Manken görselini yükle
        const mankenPath = CONFIG.MANNEQUINS[selectedGiyimTuru];
        console.log('Manken görseli yükleniyor:', mankenPath);
        const mankenBase64 = await urlToBase64(mankenPath);
        console.log('Manken base64 boyutu:', mankenBase64.length);
        
        // Giyim türüne göre prompt oluştur
        let frontPrompt = '';
        let backPrompt = '';
        
        if (selectedGiyimTuru === 'Üst Giyim') {
            frontPrompt = 'Take ONLY the upper body clothing from the first image (ignore any lower body clothing) and dress the mannequin with it. FRONT VIEW. Keep the mannequin position and pose unchanged. Professional studio lighting, high quality, 4K resolution, clean background. The upper body clothing should fit naturally on the mannequin without distorting its shape or position.';
            backPrompt = 'Take ONLY the upper body clothing from the first image (ignore any lower body clothing) and dress the mannequin with it. BACK VIEW from behind, showing the back of the clothing. Keep the mannequin position and pose unchanged. Professional studio lighting, high quality, 4K resolution, clean background. The upper body clothing should fit naturally on the mannequin without distorting its shape or position.';
        } else if (selectedGiyimTuru === 'Alt Giyim') {
            frontPrompt = 'Take ONLY the lower body clothing from the first image (ignore any upper body clothing) and dress the mannequin with it. FRONT VIEW. Keep the mannequin position and pose unchanged. Professional studio lighting, high quality, 4K resolution, clean background. The lower body clothing should fit naturally on the mannequin without distorting its shape or position.';
            backPrompt = 'Take ONLY the lower body clothing from the first image (ignore any upper body clothing) and dress the mannequin with it. BACK VIEW from behind, showing the back of the clothing. Keep the mannequin position and pose unchanged. Professional studio lighting, high quality, 4K resolution, clean background. The lower body clothing should fit naturally on the mannequin without distorting its shape or position.';
        } else if (selectedGiyimTuru === 'Elbise') {
            frontPrompt = 'Take the dress from the first image and dress the mannequin with it. FRONT VIEW. Keep the mannequin position and pose unchanged. Professional studio lighting, high quality, 4K resolution, clean background. The dress should fit naturally on the mannequin without distorting its shape or position.';
            backPrompt = 'Take the dress from the first image and dress the mannequin with it. BACK VIEW from behind, showing the back of the dress. Keep the mannequin position and pose unchanged. Professional studio lighting, high quality, 4K resolution, clean background. The dress should fit naturally on the mannequin without distorting its shape or position.';
        }
        
        // ÖN GÖRSEL İÇİN İLK İSTEK (Ön kıyafet görseli + manken)
        console.log('=== ÖN GÖRSEL İSTEĞİ ===');
        console.log('Prompt:', frontPrompt);
        showMessage('AI ön görseli oluşturuyor...', 'success');
        
        const frontResponse = await fetch(`${CONFIG.BACKEND_URL}/api/replicate/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apiKey: CONFIG.REPLICATE_API_KEY,
                model: CONFIG.REPLICATE_MODEL,
                input: {
                    prompt: frontPrompt,
                    image_input: [onKiyafetBase64, mankenBase64],
                    resolution: "2K",
                    aspect_ratio: "4:5",
                    output_format: "png",
                    safety_filter_level: "block_only_high",
                    allow_fallback_model: false
                }
            })
        });
        
        if (!frontResponse.ok) {
            const errorData = await frontResponse.json();
            throw new Error(`Replicate API hatası (Ön): ${errorData.detail || frontResponse.statusText}`);
        }
        
        const frontPrediction = await frontResponse.json();
        console.log('Ön görsel prediction:', frontPrediction);
        
        const frontResult = await waitForPrediction(frontPrediction.id);
        console.log('Ön görsel sonucu:', frontResult);
        
        if (!frontResult.output) {
            console.error('Ön görsel output yok:', frontResult);
            throw new Error('Ön görsel üretilemedi. Status: ' + frontResult.status);
        }
        
        // Ön görseli kaydet
        if (Array.isArray(frontResult.output)) {
            imageUrls.onGorsel = frontResult.output[0];
        } else {
            imageUrls.onGorsel = frontResult.output;
        }
        
        console.log('Ön görsel URL:', imageUrls.onGorsel);
        
        // Ön görseli göster
        document.getElementById('onGorsel').src = imageUrls.onGorsel;
        
        // ARKA GÖRSEL İÇİN İKİNCİ İSTEK (Arka kıyafet görseli + manken)
        console.log('=== ARKA GÖRSEL İSTEĞİ ===');
        console.log('Prompt:', backPrompt);
        showMessage('AI arka görseli oluşturuyor...', 'success');
        
        const backResponse = await fetch(`${CONFIG.BACKEND_URL}/api/replicate/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apiKey: CONFIG.REPLICATE_API_KEY,
                model: CONFIG.REPLICATE_MODEL,
                input: {
                    prompt: backPrompt,
                    image_input: [arkaKiyafetBase64, mankenBase64],
                    resolution: "2K",
                    aspect_ratio: "4:5",
                    output_format: "png",
                    safety_filter_level: "block_only_high",
                    allow_fallback_model: false
                }
            })
        });
        
        if (!backResponse.ok) {
            const errorData = await backResponse.json();
            throw new Error(`Replicate API hatası (Arka): ${errorData.detail || backResponse.statusText}`);
        }
        
        const backPrediction = await backResponse.json();
        console.log('Arka görsel prediction:', backPrediction);
        
        const backResult = await waitForPrediction(backPrediction.id);
        console.log('Arka görsel sonucu:', backResult);
        
        if (!backResult.output) {
            console.error('Arka görsel output yok:', backResult);
            throw new Error('Arka görsel üretilemedi. Status: ' + backResult.status);
        }
        
        // Arka görseli kaydet
        if (Array.isArray(backResult.output)) {
            imageUrls.arkaGorsel = backResult.output[0];
        } else {
            imageUrls.arkaGorsel = backResult.output;
        }
        
        console.log('Arka görsel URL:', imageUrls.arkaGorsel);
        
        // Arka görseli göster
        document.getElementById('arkaGorsel').src = imageUrls.arkaGorsel;
        
        aiResults.style.display = 'block';
        saveBtn.disabled = false;
        
        showMessage('✅ Her iki görsel de başarıyla oluşturuldu!', 'success');
        
    } catch (error) {
        console.error('❌ TAM HATA:', error);
        console.error('Hata mesajı:', error.message);
        console.error('Hata stack:', error.stack);
        showMessage('❌ AI işleme sırasında hata oluştu: ' + error.message, 'error');
        aiBtn.disabled = false;
    } finally {
        loading.style.display = 'none';
    }
});

// Kaydet Butonu
saveBtn.addEventListener('click', async () => {
    const adet = document.getElementById('adet').value;
    const kalite = document.getElementById('kalite').value;
    const beden = document.getElementById('beden').value;
    const fiyat = document.getElementById('fiyat').value;
    
    if (!adet || !kalite || !beden || !fiyat) {
        showMessage('Lütfen tüm alanları doldurun!', 'error');
        return;
    }
    
    if (!imageUrls.onGorsel || !imageUrls.arkaGorsel) {
        showMessage('Önce AI ile görselleri oluşturun!', 'error');
        return;
    }
    
    saveBtn.disabled = true;
    loading.style.display = 'block';
    
    try {
        // Google Apps Script'e veri gönder (GiyimTuru dahil DEĞİL)
        const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // CORS hatası olmaması için
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                onGorsel: imageUrls.onGorsel,
                arkaGorsel: imageUrls.arkaGorsel,
                adet: adet,
                kalite: kalite,
                beden: beden,
                fiyat: fiyat
            })
        });
        
        // no-cors modunda response okunamaz, başarılı kabul edelim
        showMessage('✅ Veriler başarıyla Google Sheets\'e kaydedildi!', 'success');
        
        // Google Sheets'i yeni sekmede aç
        setTimeout(() => {
            window.open('https://docs.google.com/spreadsheets/d/1_NNSHdXN04fws7Ni7FH66B7tKfBBRiERy8yefpmkEzs/edit', '_blank');
        }, 1000);
        
        // Formu temizle
        setTimeout(() => {
            resetForm();
        }, 2000);
        
    } catch (error) {
        console.error('Kayıt hatası:', error);
        showMessage('Kayıt sırasında hata oluştu: ' + error.message, 'error');
        saveBtn.disabled = false;
    } finally {
        loading.style.display = 'none';
    }
});

// Yardımcı Fonksiyonlar

// Dosyayı base64'e çevir
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// URL'den görseli base64'e çevir
async function urlToBase64(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Manken görseli yüklenemedi:', error);
        throw new Error('Manken görseli bulunamadı. Lütfen mannequins klasörüne görselleri ekleyin.');
    }
}

// Replicate sonucunu bekle
async function waitForPrediction(predictionId) {
    let attempts = 0;
    const maxAttempts = 120; // 120 saniye (2 dakika)
    
    console.log('Prediction bekleniyor, ID:', predictionId);
    
    while (attempts < maxAttempts) {
        const response = await fetch(`${CONFIG.BACKEND_URL}/api/replicate/prediction/${predictionId}`, {
            headers: {
                'Authorization': `Bearer ${CONFIG.REPLICATE_API_KEY}`
            }
        });
        
        const prediction = await response.json();
        console.log(`Deneme ${attempts + 1}: Status = ${prediction.status}`);
        
        if (prediction.status === 'succeeded') {
            console.log('Başarılı! Output:', prediction.output);
            return prediction;
        }
        
        if (prediction.status === 'failed') {
            console.error('Başarısız prediction:', prediction);
            throw new Error('AI işlem başarısız oldu: ' + (prediction.error || 'Bilinmeyen hata'));
        }
        
        if (prediction.status === 'canceled') {
            throw new Error('AI işlemi iptal edildi');
        }
        
        // 1 saniye bekle
        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
    }
    
    throw new Error('AI işlemi zaman aşımına uğradı (120 saniye)');
}

// Mesaj göster
function showMessage(message, type) {
    result.textContent = message;
    result.className = `result ${type}`;
    result.style.display = 'block';
    
    // 5 saniye sonra gizle
    setTimeout(() => {
        result.style.display = 'none';
    }, 5000);
}

// Formu temizle
function resetForm() {
    uploadedFrontFile = null;
    uploadedBackFile = null;
    selectedGiyimTuru = null;
    imageUrls = { onGorsel: '', arkaGorsel: '' };
    
    previewFront.style.display = 'none';
    previewBack.style.display = 'none';
    aiResults.style.display = 'none';
    fileInputFront.value = '';
    fileInputBack.value = '';
    
    // Upload alanlarından has-image class'ını kaldır
    uploadAreaFront.classList.remove('has-image');
    uploadAreaBack.classList.remove('has-image');
    
    // Giyim türü butonlarını sıfırla
    ustGiyimBtn.classList.remove('active');
    altGiyimBtn.classList.remove('active');
    elbiseBtn.classList.remove('active');
    
    document.getElementById('adet').value = '1';
    document.getElementById('kalite').value = '';
    document.getElementById('beden').value = '';
    document.getElementById('fiyat').value = '';
    
    aiBtn.disabled = true;
    saveBtn.disabled = true;
}
