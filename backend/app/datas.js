const express = require('express');

const User = require('../models/User');

const router = express.Router();

router.get('/users', async (req, res) => {
	try {
		const users = await User.find();

		res.send(JSON.stringify(users));
	} catch (e) {
		return res.status(500).send(e);
	}
});

module.exports = router;