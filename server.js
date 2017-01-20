var https = require('https');
var http = require('http');

var server = http.createServer((request, response) => {
	var body = '';
	request.on('data', (chunk) => {
		body += chunk;
	});
	request.on('end', () => {
		try {
			var options = JSON.parse(body);
			var httpsResult = '';
			var httpsRequest = https.request(options, (httpsResponse) => {
				httpsResponse.on('data', (data) => {
					httpsResult += data;
				});
				httpsResponse.on('end', () => {
					response.end(httpsResult);
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
