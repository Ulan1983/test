const path = require('path');
const rootPath = __dirname;

const env = process.env.NODE_ENV;

let database = 'mongodb://localhost/newsDB';
let port = 8000;

if (env === 'test') {
	database = 'mongodb://localhost/newsDB-test';
	port = 8010;
}

module.exports = {
	rootPath,
	userAvatar: path.join(rootPath, 'public/uploads/userAvatar'),
	articleImage: path.join(rootPath, 'public/uploads/articleImage'),
	database,
	databaseOptions: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	},
	port,
};