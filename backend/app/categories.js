const express = require('express');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const Category = require('../models/Category');

const router = express.Router();

router.get('/', auth, async (req, res) => {
	try {
		const categories = await Category.find();

		if (!categories) {
			return res.status(404).send({error: 'Не найдено'});
		}
		 return res.send(categories);
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.get('/:id', auth, async (req, res) => {
	try {
		const category = await Category.findOne({_id: req.params.id});

		if (!category) {
			return res.status(404).send({error: 'Не найдено'});
		}
		return res.send(category);
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.post('/', auth, async (req, res) => {
	try {
		const category = new Category({
			title: req.body.title,
		});

		await category.save();

		return res.send(category);
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
	try {
		const category = await Category.findOne({_id: req.params.id});

		if (!category) {
			return res.status(404).send({error: 'Не найдено'});
		}

		await category.delete({_id: req.params.id});
		return res.send({message: 'Deleted successfully'});
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.put('/:id', auth, async (req, res) => {
	try {
		const categoryData = req.body;
		const category = await Category.findOne({_id: req.params.id});

		category.title = categoryData.title;

		await category.save();

		return res.send(category);
	} catch (error) {
		return res.status(500).send(error);
	}
});

module.exports = router;