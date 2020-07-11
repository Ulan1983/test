const mongoose = require('mongoose');
const config = require("./config");
const User = require('./models/User');
const Category = require('./models/Category');
const Article = require('./models/Article');

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

	const [cat1, cat2, cat3, cat4, cat5] = await Category.create({
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

	await Article.create({
		title: 'Трамп запретил иммиграцию',
		description: 'Президент США Д. Трамп продлил запрет на въезд на территорию США для обладателей иммиграционных и рабочих виз',
		image: 'uploads/articleImage/images (3).jpeg',
		category: cat1,
		user: user1
	}, {
		title: 'Лига Чемпионов',
		description: 'Состоялась жеребьевка плей офф лиги чемпионов УЕФА',
		image: 'uploads/articleImage/football.jpg',
		category: cat2,
		user: user2
	}, {
		title: 'Вакцина',
		description: 'Создание вакцины от COVID-19 продолжается в нескольких странах',
		image: 'uploads/articleImage/medic.jpg',
		category: cat3,
		user: user3
	}, {
		title: 'Погода',
		description: 'В Японии продолжает бушевать непогода. Жертвами наводнения стали сотни человек',
		image: 'uploads/articleImage/japan.jpg',
		category: cat4,
		user: user1
	}, {
		title: 'Культура',
		description: 'Культурная жизнь в России потихоньку начинает оживать',
		image: 'uploads/articleImage/rus.jpeg',
		category: cat5,
		user: user2
	});

	mongoose.connection.close();
};

run().catch(e => {
	throw e;
});