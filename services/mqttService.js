const mqtt = require('mqtt');
const db = require('../config/db');

const setupMqtt = () => {
    // KONEKSI KE HIVEMQ CLOUD (SECURE)
    const client = mqtt.connect({
        host: '',
        port: 8883,
        protocol: 'mqtts', 
        username: 'smartparking',
        password: 'Smartparking1'
    });

    client.on('connect', () => {
        console.log('✅ MQTT Connected to HiveMQ Cloud (Secure)');
        // Subscribe ke topik log
        client.subscribe('parkir/sistem/gate/log');
    });

    client.on('error', (err) => {
        console.error('❌ MQTT Error:', err);
    });

    client.on('message', (topic, message) => {
        if (topic === 'parkir/sistem/gate/log') {
            const msg = message.toString(); 
            console.log(`MQTT Log diterima: ${msg}`);
            
            // --- LOGIKA PERBAIKAN DI SINI ---
            let typeValue = null;

            // Cek apakah pesan mengandung kata "MASUK" atau "KELUAR"
            // Ini untuk menangani variasi pesan seperti "MOBIL MASUK", "GATE MASUK", atau "MASUK" saja
            if (msg.toUpperCase().includes('MASUK')) {
                typeValue = 'MASUK';
            } else if (msg.toUpperCase().includes('KELUAR')) {
                typeValue = 'KELUAR';
            }

            // Hanya simpan jika datanya valid ('MASUK' atau 'KELUAR')
            if (typeValue) {
                const sql = "INSERT INTO history (type) VALUES (?)";
                db.query(sql, [typeValue], (err) => {
                    if (err) {
                        // Tampilkan pesan error lengkap biar ketahuan salahnya apa
                        console.error("❌ Gagal simpan log DB:", err.sqlMessage || err);
                    } else {
                        console.log(`✅ Berhasil simpan status: ${typeValue} ke Database`);
                    }
                });
            } else {
                console.log(`⚠️ Pesan diabaikan (Format salah): ${msg}`);
            }
        }
    });

    return client;
};

module.exports = setupMqtt;
