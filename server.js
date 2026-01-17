const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
const setupMqtt = require('./services/mqttService');
const announcementRoute = require('./routes/announcement'); // 1. Impor filenya

const app = express();


// Gunakan opsi ini agar lebih resmi di mata Chrome
app.use(cors({
    origin: '*', // Mengizinkan semua sumber
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', apiRoutes);
app.use('/api/announcements', announcementRoute); // 2. Gunakan rutenya

// Jalankan Service MQTT
setupMqtt();

// Ganti app.listen(3000) menjadi:
app.listen(3000, () => {
  console.log('Server aktif dan bisa diakses dari HP!');
});