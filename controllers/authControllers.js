const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();


const register = (req, res) => {
    const {email, password, fullname } = req.body;
    
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: 'Gagal hash password' });

        const sql = 'INSERT INTO table_register (email, password, fullname) VALUES (?, ?, ?)';
        db.query(sql, [email, hash, fullname], (err, result) => {
            if (err) return res.status(500).json({ error: 'Gagal daftar user' });
            res.json({ message: 'User terdaftar!', userId: result.insertId });
        });
    });
};

const login = (req, res) => {
    const {fullname, password} = req.body;

    const sql = 'SELECT * FROM table_register WHERE fullname = ?';
    db.query(sql, [fullname], (err, results) => {
        if(err) return res.status(500).json({error: 'Gagal mencari user'});
        if(results.length === 0) return res.status(401).json({error: 'Fullname tidak ditemukan'});

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if(err || !isMatch) return res.status(401).json({error: 'Password salah'});

            const token = jwt.sign({id: user.id, fullname: user.fullname}, process.env.JWT_SECRET, { expiresIn: '1h'});

            res.json({message: 'Login berhasil', token});
        })
    }) 
}

module.exports = {register, login};