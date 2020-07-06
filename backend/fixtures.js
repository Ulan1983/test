const mongoose = require('mongoose');
const config = require("./config");
const User = require('./models/User');

const run = async () => {
	await mongoose.connect(config.database, config.databaseOptions);

	const collection = await mongoose.connection.db.listCollections().toArray();

	for (let coll of collection) {
		await mongoose.connection.db.dropCollection(coll.name);
	}

	const [user1, user2] = await User.create({
		username: 'user',
		password: '123456',
		token: '123456',
	}, {
		username: 'user2',
		password: '123456',
		token: '123456',
	});


	mongoose.connection.close();
};

run().catch(e => {
	throw e;
});