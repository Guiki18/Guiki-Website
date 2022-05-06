const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const moment = require('moment');

todayDate = new String(moment().format("L"));
todayDate = todayDate.replace("/", "-");
todayDate = todayDate.replace("/", "-");

require('better-logging')(console, {
	format: ctx => `${ctx.time24} ${ctx.date} ${ctx.type} | ${ctx.msg}`,
	saveToFile: `${__dirname}/logs/${todayDate}.log`,
	logLevels: {
		debug: true,
	}
});

app.use(express.json());
app.use(express.static("express"));
app.use(express.static(__dirname + '/web'));


app.use('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/web/'));
	const ip = req.socket.remoteAddress;
	
	const jsonRequestInformation = {
		"method": req.method,
		"url": req.url,
		"ip": {
			"ip": ip,
		},
	}
	console.log("Received a Request : \n" + JSON.stringify(jsonRequestInformation, null, '\t'));
});

console.debug("Starting server...");
const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server start at port ' + port);