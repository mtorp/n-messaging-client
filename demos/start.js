require('sucrase/register');
const https = require('https');
const readFileSync = require('fs').readFileSync;

const httpsOptions = {
	key: readFileSync(__dirname + '/self-signed-ssl-key.pem').toString(),
	cert: readFileSync(__dirname + '/self-signed-ssl-certificate.pem').toString()
};

const app = require('./app');

const PORT = process.env.PORT || 5005;

https.createServer(httpsOptions, app).listen(PORT, () => {
	console.log(`Listening on https://local.ft.com:${PORT}`); // eslint-disable-line no-console
});
