const express = require('express');
const router = require('./router');
const app = express();
const fs = require('fs')
const https = require('https')
// 控制台获取body信息
const bodyParser = require('body-parser')
const cors = require('cors')
// https签名
const privateKey = fs.readFileSync('./https/3877184_liaocx.design.key', 'utf8')
const certificate = fs.readFileSync('./https/3877184_liaocx.design.pem', 'utf8')
const credentials = { key: privateKey, cert: certificate }
const httpsServer = https.createServer(credentials, app)

const SSLPORT = 18082

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// 跨域
app.use(cors())

app.use('/', router);
const server = app.listen(5000, () => {
  const { address, port } = server.address();
  console.log('Http Server is running on http://%s:%s', address, port);
});


httpsServer.listen(SSLPORT, function() {
  console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT)
})