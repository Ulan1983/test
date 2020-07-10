const mongoose = require('mongoose');
const config = require("./config");
const User = require('./models/User');
const Category = require('./models/Category');

const run = async () => {
	await mongoose.connect(config.database, config.databaseOptions);

	const collection = await mongoose.connection.db.listCollections().toArray();

	for (let coll of collection) {
		await mongoose.connection.db.dropCollection(coll.name);
	}

	const [user1, user2, user3] = await User.create({
		username: 'user',
		password: '123456',
		token: '123456',
		role: 'user'
	}, {
		username: 'admin',
		password: '123456',
		token: '123456',
		role: 'admin'
	}, {
		username: 'crazy frog',
		password: '123456',
		token: '123456',
		role: 'user'
	});

	await Category.create({
		title: 'Политика'
	}, {
		title: 'Спорт'
	}, {
		title: 'Медицина'
	}, {
		title: 'Погода'
	}, {
		title: 'Культура'
	});


	mongoose.connection.close();
};

run().catch(e => {
	throw e;
});