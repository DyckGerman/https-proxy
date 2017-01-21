var https = require('https');
var http = require('http');

var server = http.createServer((request, response) => {
	var body = '';
	request.on('data', (chunk) => {
		body += chunk;
		console.log('chunk recieved');
	});
	request.on('end', () => {
		console.log('request ended');
		try {
			var options = JSON.parse(body);
			var httpsResult = '';
			var httpsRequest = https.request(options, (httpsResponse) => {
				httpsResponse.on('data', (data) => {
					httpsResult += data;
					console.log('https chunk recieved');
				});
				httpsResponse.on('end', () => {
					response.end(httpsResult);
					console.log('https response ended');
				});
			});
			httpsRequest.end();
		} catch (error) {
			console.log(error);
			response.end(error);
		}
	});
});

server.listen('4200');
console.log('start listening');
