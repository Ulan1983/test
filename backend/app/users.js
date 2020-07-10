const express = require('express');
const bcrypt = require('bcrypt');

const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const upload = require('../multer');

const User = require('../models/User');

const router = express.Router();

router.get('/', auth, async (req, res) => {
	try {
		const users = await User.find();
		res.send(users)
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.get('/:id', auth, async (req, res) => {
	try {
		const user = await User.findOne({_id: req.params.id});

		if (!user) {
			return res.status(404).send({error: 'Не найдено'});
		}
		res.send(user);
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.post('/', upload.single('avatar'), async (req, res) => {
	try {
		const userData = req.body;

		if (req.file) {
			userData.avatar = req.file.filename;
		}

		const user = new User({
			username: userData.username,
			password: userData.password,
			avatar: userData.avatar
		});

		user.generateToken();
		await user.save();

		return res.send(user._id);
	} catch (error) {
		res.status(500).send(error)
	}
});

router.post('/sessions', async (req, res) => {
	try {
		const user = await User.findOne({username: req.body.username});

		if (!user) {
			return res.status(400).send({error: 'Введенные логин или пароль неверны!'});
		}

		const isMatch = await bcrypt.compare(req.body.password, user.password);

		if (!isMatch) {
			return res.status(400).send({error: 'Введенные логин или пароль неверны!'});
		}

		user.generateToken();
		await user.save();
		return res.send(user);
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.delete('/sessions', async (req, res) => {
	const success = {message: 'Success'};

	try {
		const token = req.get('Authorization').split(' ')[1];

		if (!token) return res.send(success);

		const user = await User.findOne({token});

		if (!user) return res.send(success);

		user.generateToken();
		await user.save();

		return res.send(success);
	} catch (error) {
		return res.send(success);
	}
});

router.put('/', auth, upload.single('avatar'), async (req, res) => {
	try {
		const userData = req.body;

		const user = await User.findOne({_id: req.user._id});

		if (req.file) {
			userData.avatar = req.file.filename;
		}

		if (userData.avatar) {
			user.avatar = userData.avatar
		}

		user.username = userData.username;

		await user.save();
		return res.send(user);
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
	try {
		const user = await User.findOne({_id: req.params.id});

		if (!user) {
			return res.status(404).send({error: 'Не найдено'});
		}

		if (user._id.toString() === req.user._id.toString()) {
			return res.status(401).send({error: 'Вы не можете удалить сами себя'});
		}
		await user.delete({_id: req.params.id});
		return res.send({message: 'Deleted successfully'});
	} catch (error) {
		return res.status(500).send(error);
	}
});

module.exports = router;