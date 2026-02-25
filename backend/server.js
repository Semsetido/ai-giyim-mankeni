const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const https = require('https');

const app = express();

// Environment variables (Railway otomatik ayarlar)
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// SSL sertifika doğrulaması - sadece development'ta devre dışı
const httpsAgent = new https.Agent({
  rejectUnauthorized: NODE_ENV === 'production' ? true : false
});

// CORS ayarları - TÜM origin'lere izin ver
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key', 'X-Requested-With'],
  credentials: false
}));

app.use(express.json({ limit: '50mb' })); // Büyük base64 görseller için

// OPTIONS handler for CORS preflight
app.options('*', cors());

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'AI Görsel Backend API çalışıyor!',
    endpoints: {
      createPrediction: 'POST /api/replicate/predict',
      getPrediction: 'GET /api/replicate/prediction/:id'
    }
  });
});

// Replicate API'ye istek oluştur
app.post('/api/replicate/predict', async (req, res) => {
  try {
    // Railway environment variable'dan token oku
    const apiKey = process.env.REPLICATE_API_KEY || req.body.apiKey;
    const { model, input } = req.body;

    if (!apiKey || !model || !input) {
      return res.status(400).json({ 
        error: 'Missing required fields: apiKey, model, input' 
      });
    }

    console.log(`📤 Replicate'e istek gönderiliyor: ${model}`);
    console.log(`   API Key alındı: ${apiKey ? 'Evet (uzunluk: ' + apiKey.length + ')' : 'HAYıR!'}`);
    console.log(`   Prompt: ${input.prompt.substring(0, 50)}...`);

    const response = await fetch(`https://api.replicate.com/v1/models/${model}/predictions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait'
      },
      body: JSON.stringify({ input }),
      agent: httpsAgent
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Replicate API hatası:', errorData);
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    console.log(`✅ Prediction oluşturuldu: ${data.id}`);
    
    res.json(data);
  } catch (error) {
    console.error('❌ Backend hatası:', error);
    res.status(500).json({ 
      error: 'Backend error', 
      message: error.message 
    });
  }
});

// Prediction durumunu kontrol et
app.get('/api/replicate/prediction/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const apiKey = req.headers.authorization?.replace('Bearer ', '');

    if (!apiKey) {
      return res.status(401).json({ error: 'API key required in Authorization header' });
    }

    console.log(`🔍 Prediction kontrol ediliyor: ${id}`);

    const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      agent: httpsAgent
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Replicate API hatası:', errorData);
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    console.log(`   Status: ${data.status}`);
    
    res.json(data);
  } catch (error) {
    console.error('❌ Backend hatası:', error);
    res.status(500).json({ 
      error: 'Backend error', 
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log('\n🚀 ================================');
  console.log(`✅ Backend API çalışıyor!`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌍 Environment: ${NODE_ENV}`);
  console.log('🔧 Endpoints:');
  console.log(`   POST /api/replicate/predict`);
  console.log(`   GET  /api/replicate/prediction/:id`);
  console.log('================================\n');
});
