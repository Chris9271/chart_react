require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const {createProxyMiddleware} = require('http-proxy-middleware');
const app = express();

// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true
// }));

const whiteList = ['http://localhost:3000', 'http://localhost:5000'];
const corsOptions = {
    origin: function(origin, callback){
        console.log("** Origin of request **" + origin);
        if(whiteList.indexOf(origin) !== -1 || !origin){
            console.log("Origin acceptable");
            callback(null, true)
        }else{
            console.log("Origin rejected");
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions));

const option = {
    target: process.env.SOURCE_API,
    changeOrigin: true,
    pathRewrite: {
        '^/api':''
    }
}

const optProxy = createProxyMiddleware(option);

app.use('/api', optProxy);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res, next) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}.`)
});