const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	category: {
		type: Schema.Types.ObjectID,
		ref: 'Category',
		required: true
	},
	user: {
		type: Schema.Types.ObjectID,
		ref: 'User',
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	image: {
		type: String,
	}
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;