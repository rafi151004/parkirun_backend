const express = require('express');
const router = express.Router();
// Menggunakan destructuring agar lebih jelas fungsi apa saja yang diambil
const { 
    login, 
    getHistory, 
    getAnnouncements, 
    postAnnouncement 
} = require('../controllers/mainController');

// Daftar URL
router.post('/login', login);
router.get('/history', getHistory);
router.get('/announcements', getAnnouncements);
router.post('/announcements', postAnnouncement);

module.exports = router;