const express = require('express');

const User = require('../models/User');
const Category = require('../models/Category');

const router = express.Router();

router.get('/users', async (req, res) => {
	try {
		const users = await User.find();

		res.send(JSON.stringify(users));
	} catch (e) {
		return res.status(500).send(e);
	}
});

router.get('/categories', async (req, res) => {
	try {
		const categories = await Category.find();

		res.send(JSON.stringify(categories));
	} catch (e) {
		return res.status(500).send(e);
	}
});

module.exports = router;