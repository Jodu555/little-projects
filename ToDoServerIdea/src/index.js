const http = require('http');
const express = require('express');
const https = require('https');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv').config();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

let server;
if (process.env.https) {
	const sslProperties = {
		key: fs.readFileSync(process.env.KEY_FILE),
		cert: fs.readFileSync(process.env.CERT_FILE),
	};
	server = https.createServer(sslProperties, app);
} else {
	server = http.createServer(app);
}

let todos = [
	{
		name: 'The Magical Revolution of the Reincarnated Princess and the Genius Young Lady',
		categorie: 'Aniworld',
		references: {
			aniworld: 'https://aniworld.to/anime/stream/the-magical-revolution-of-the-reincarnated-princess-and-the-genius-young-lady',
			zoro: '',
		},
		order: 1,
	},
	{
		name: 'Ningen Fushin: Adventurers Who Don’t Believe in Humanity Will Save the World',
		categorie: 'Aniworld',
		references: {
			aniworld: 'https://aniworld.to/anime/stream/ningen-fushin-adventurers-who-dont-believe-in-humanity-will-save-the-world',
			zoro: '',
		},
		order: 2,
	},
	{
		name: 'The tale of outcasts',
		categorie: 'Aniworld',
		references: {
			aniworld: 'https://aniworld.to/anime/stream/the-tale-of-outcasts',
			zoro: '',
		},
		order: 3,
	},
];

// Your Middleware handlers here

app.get('/todo', (req, res) => {
	res.json(todos);
});

app.post('/todo', (req, res) => {
	console.log('Came', req.body);
	todos = req.body;
	console.log('Updated');
	res.json(todos);
	console.log('Sent Status');
});

const PORT = process.env.PORT || 3200;
server.listen(PORT, () => {
	console.log(`Express App Listening ${process.env.https ? 'with SSL ' : ''}on ${PORT}`);
});
