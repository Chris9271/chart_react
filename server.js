require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {createProxyMiddleware} = require('http-proxy-middleware');
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

const option = {
    target: process.env.API_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api':''
    }
}

const optProxy = createProxyMiddleware(option);

app.use('/api', optProxy);

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}.`)
});