const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const users = require('./app/users');
const categories = require('./app/categories');
const datas = require('./app/datas');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
	await mongoose.connect(config.database, config.databaseOptions);

	app.use('/users', users);
	app.use('/categories', categories);
	app.use('/datas', datas);


	app.listen(config.port, () => {
		console.log(`HTTP server started on ${config.port} port...`);
	})
};

run().catch(e => {
	console.error(e)
});