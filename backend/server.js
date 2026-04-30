require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const axios = require('axios'); 

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Basic route to check if server is running
app.get('/', (req, res) => {
  res.send('Support SaaS API is running...');
});
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    try {
        // Forward user message to Python
        const aiRes = await axios.post('http://127.0.0.1:8000/chat', { query: message });
        
        // Return Python's Gemini/RAG answer to React
        res.json({ response: aiRes.data.response });
    } catch (error) {
        res.status(500).json({ response: "AI Engine is offline. Check Python terminal." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));