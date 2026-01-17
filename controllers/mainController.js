const db = require('../config/db');

exports.login = (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length > 0) res.json({ status: true, data: results[0] });
        else res.json({ status: false, message: "Login Gagal" });
    });
};

exports.getHistory = (req, res) => {
    db.query("SELECT * FROM history ORDER BY created_at DESC LIMIT 20", (err, resDb) => {
        if (err) res.status(500).send(err);
        else res.json(resDb);
    });
};

exports.getAnnouncements = (req, res) => {
    db.query("SELECT * FROM announcements ORDER BY created_at DESC", (err, resDb) => {
        if (err) res.status(500).send(err);
        else res.json(resDb);
    });
};

exports.postAnnouncement = (req, res) => {
    db.query("INSERT INTO announcements (message) VALUES (?)", [req.body.message], (err) => {
        if (err) res.status(500).send(err);
        else res.json({ success: true });
    });
};