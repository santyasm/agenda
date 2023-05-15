import User from '../models/User';

export default class LoginController {
	static errors = [];

	static async index(req, res) {
		res.render('login/index', { errors: LoginController.errors });
	}
	static async store(req, res) {
		const { email, name, password, confirmpass } = req.body;
		try {
			if (confirmpass != password) {
				console.log('Senhas diferentes.');
				return res.redirect('/login/index');
			}

			const newUser = await User.create({ email, name, password });

			res.redirect('/');
			return newUser;
		} catch (error) {
			const err = error.errors.map((e) => ({ error: e.message }));
			req.flash('errors', err);

			req.session.save(() => {
				return res.redirect('back');
			});
			return;
		}
	}
}
