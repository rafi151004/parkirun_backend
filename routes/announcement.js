const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Mengambil koneksi dari folder config

// READ: Menampilkan semua pengumuman
router.get('/', (req, res) => {
    const query = "SELECT * FROM announcements ORDER BY created_at DESC";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

// CREATE: Tambah pengumuman
router.post('/', (req, res) => {
    const { message } = req.body;
    const query = "INSERT INTO announcements (message, created_at) VALUES (?, NOW())";
    db.query(query, [message], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ status: "Success", id: result.insertId });
    });
});

// UPDATE: Edit pengumuman
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    const query = "UPDATE announcements SET message = ? WHERE id = ?";
    db.query(query, [message, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "Success" });
    });
});

// DELETE: Hapus pengumuman
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM announcements WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "Success" });
    });
});

module.exports = router;