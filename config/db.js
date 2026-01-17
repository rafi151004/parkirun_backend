const mysql = require('mysql2');

// Membuat Pool Koneksi agar lebih stabil
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',      // Default Laragon
    password: '',      // Default Laragon (kosongkan jika tidak pakai password)
    database: 'parkir_pintar',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Tes Koneksi saat Server Dijalankan
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database Gagal Konek:', err.message);
    } else {
        console.log('✅ Database Connected (Pool Active)!');
        connection.release(); // Kembalikan koneksi ke pool
    }
});

module.exports = db;