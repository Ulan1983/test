const express = require('express');

const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const upload = require('../multer');
const Article = require('../models/Article');

const router = express.Router();

router.get('/', auth, async (req, res) => {
	try {
		if (req.query.category) {
			const articles = await Article.find({category: req.query.category});

			return res.send(articles);
		}

		const articles = await Article.find().populate('category');

		if (!articles) {
			return res.status(404).send({error: 'Не найдено'});
		}

		return res.send(articles);
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.get('/:id', auth, async (req, res) => {
	try {
		const article = await Article.findOne({_id: req.params.id}).populate('category').populate('user');

		if (!article) {
			return res.status(404).send({error: 'Не найдено'});
		}

		return res.send(article);
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
	try {
		const articleData = req.body;

		if (req.file) {
			articleData.image = req.file.filename;
		}

		const article = new Article({
			title: articleData.title,
			description: articleData.description,
			image: articleData.image,
			user: req.user,
			category: articleData.category
		});

		await article.save();

		return res.send(article);
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
	try {
		const article = await Article.findOne({_id: req.params.id});

		if (!article) {
			return res.status(404).send({error: 'Не найдено'});
		}

		await article.delete({_id: req.params.id});
		return res.send({message: 'Deleted successfully'});
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.put('/edit/:id', auth, async (req, res) => {
	try {
		const articleData = req.body;
		const article = await Article.findOne({_id: req.params.id});

		if (req.file) {
			articleData.image = req.file.filename;
		}

		if (articleData.image) {
			article.image = articleData.image
		}

		article.title = articleData.title;
		article.description = articleData.description;
		article.user = articleData.user;
		article.category = articleData.category;

		await article.save();

		return res.send(article);
	} catch (error) {
		return res.status(500).send(error);
	}
});

module.exports = router;
