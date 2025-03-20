require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db');

const app = express();
app.use(express.json()); 

const cors = require('cors');
app.use(cors());

app.use('/auth', authRoutes); 

const userRoutes = require("./routes/index");
app.use('/api', userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
