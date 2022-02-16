const express = require('express')
const router = express.Router()
const { Users, History, Biodata } = require('../models')

router.get('/', (req, res, next) => {
	try {
		const { status } = req.query;
		res.render('main.ejs', { headTitle: "Dashboard", status });
	} catch (error) {
		next(error);
	}
});

router.get('/login', (req, res, next) => {
	try {
		const { status } = req.query;
		res.render('login.ejs', { headTitle: "Login", status });
	} catch (error) {
		next(error);
	}
});

router.post('/login', async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const UserAcc = await Users.findAll();

		const UserIsRight = UserAcc.find((item) => item.email === email);

		if (!UserIsRight) {
			res.redirect('/login?status=emailnotfound');
		} else {
			const match = await bcrypt.compare(password, UserIsRight.password);

			if (match) {
				res.redirect('/dashboard');
			} else {
				res.redirect('/login?status=wrongpassword');
			}
		}
	} catch (error) {
		next(error);
	}
});

router.get('/add', (req, res, next) => {
	try {
		res.render('add.ejs', { headTitle: 'Add Account' });
	} catch (error) {
		next(error);
	}
});


router.post('/add', async (req, res, next) => {
	const { username, email, password, age, city, win, lose } = req.body;

	try {
		const newUser = await Users.create({
			username,
			email,
			password,
		});

		await Biodata.create({
			age,
			city,
			user_uuid: newUser.uuid,
		});

		await History.create({
			win,
			lose,
			user_uuid: newUser.uuid,
		});

		if (newUser) {
			res.redirect('/');
		}
	} catch (error) {
		next(error);
	}
});

router.post('/edit/:id', async (req, res, next) => {
	const { username, email, password, age, city, win, lose } = req.body;
	try {
		const userToUpdate = await Users.findByPk(req.params.id);

		if (userToUpdate) {
			const biodataToUpdate = await Biodata.findOne({
				where: {
					user_uuid: req.params.id,
				}
			});

			const updatedBiodata = await biodataToUpdate.update({
				age: age === "" ? biodataToUpdate.age : age,
				city: city
			});

			const historyToUpdate = await History.findOne({
				where: {
					user_uuid: req.params.id,
				}
			});

			const updatedHistory = await historyToUpdate.update({
				win: win === "" ? historyToUpdate.win : win,
				lose: lose === "" ? historyToUpdate.lose : lose
			});

			const updated = await userToUpdate.update({
				username: username ?? userToUpdate.username,
				email: email ?? userToUpdate.email,
				password: password === "" ? userToUpdate.password : password,
			});

			res.redirect('/');
		}
	} catch (error) {
		next(error);
	}
});

router.post('/delete/:id', async (req, res, next) => {
	try {
		const userToDelete = await Users.findByPk(req.params.id);

		if (userToDelete) {
			await Biodata.destroy({
				where: {
					user_uuid: req.params.id,
				},
			});

			await History.destroy({
				where: {
					user_uuid: req.params.id,
				},
			});

			const deleted = await User.destroy({
				where: {
					uuid: req.params.id,
				},
			});

			res.redirect('/?status=successfullydeleted');
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router