const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'roti-o'
});

connection.connect((err) => {
    if(err){
        console.error('Tidak terhubung ke database', err);
        return;
    }
    console.log('Terhubung ke database');
});

module.exports = connection;