const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const rateLimit = require('express-rate-limit');

app.use(express.json());
app.use(express.static("express"));

const rateLimitProtetor = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
})

app.use('/', rateLimitProtetor, function(req,res){
    res.sendFile(path.join(__dirname+'/web/'));
});

const server = http.createServer(app);
const port = 3000;

server.listen(port);
console.debug('Server listening on port ' + port);