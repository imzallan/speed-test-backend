const express = require('express');
const FastSpeedtest = require('fast-speedtest-api');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS

app.get('/speedtest', (req, res) => {
	console.log('Speedtest request received');
	let speedtest = new FastSpeedtest({
		token: 'YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm',
		verbose: false,
		timeout: 10000,
		https: true,
		urlCount: 5,
		bufferSize: 8,
		unit: FastSpeedtest.UNITS.Mbps,
		proxy: 'https://www.google.com/',
	});

	speedtest
		.getSpeed()
		.then((s) => {
			console.log('Speedtest completed');
			console.log(`Speed: ${s} Mbps`);
			res.json({ speed: s });
		})
		.catch((e) => {
			console.error(e.message);
			res.status(500).send(e.message);
		});
});

app.listen(port, () => {
	console.log(`Speedtest app listening at http://localhost:${port}`);
});
