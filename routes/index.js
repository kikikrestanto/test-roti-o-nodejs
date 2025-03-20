const express = require("express");
const router = express.Router();
const db = require('../config/db');

// ADD
router.post("/add-data", (req,res) => {
    const {nik, nama_karyawan, tanggal_lahir, jenis_kelamin} = req.body;
    db.query("INSERT INTO table_users (nik, nama_karyawan, tanggal_lahir, jenis_kelamin) VALUES (?, ?, ?, ?)", [nik, nama_karyawan, tanggal_lahir, jenis_kelamin], (err, result) => {
        if(err) return res.status(500).json({error: err.message});
        res.json({message: 'Data Berhasil Ditambah', userId: result.insertId})
    })
})


// GET ALL DATA
router.post("/list-data", (req,res) => {
    db.query("SELECT * FROM table_users", (err, results) => {
        if(err) return res.status(500).json({error: err.message});
        res.json(results);
    })
})

// UPDATE
router.put("/update-data/:id", (req, res) => {
    const { id } = req.params;
    const {nik, nama_karyawan, tanggal_lahir, jenis_kelamin} = req.body;
    db.query("UPDATE table_users SET nik = ?, nama_karyawan = ?, tanggal_lahir = ?, jenis_kelamin = ? WHERE id = ?", [nik, nama_karyawan, tanggal_lahir, jenis_kelamin, id], (err, result) => {
        if(err) return res.status(500).json({error: err.message});
        if(result.affectedRows === 0) return res.status(404).json({error: 'Data tidak ditemukan'}),
        res.json({message: 'Data Berhasil Diperbarui'});
    })
})

// GET BY ID
router.post("/get-data/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM table_users WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Data tidak ditemukan" });
        res.json(results[0]);
    });
});

// DELETE DATA
router.post("/delete-data/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM table_users WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Data tidak ditemukan" });
        res.json({message: 'Data Berhasil Dihapus'});
    });
})

module.exports = router;