import User from '../models/User';

export default class LoginController {
	static errors = [];

	static async index(req, res) {
		res.render('login/index', { errors: LoginController.errors });
	}
	static async store(req, res) {
		const { email, name, password, confirmpass } = req.body;
		try {
			if (confirmpass !== password) {
				req.flash('errors', 'Senhas diferentes!');
				req.session.save();
				return res.redirect('back');
			}

			// req.flash('success', 'Usuário cadastrado com sucesso!');
			const newUser = await User.create({ email, name, password });
			await req.session.save();

			res.redirect('/');
			return newUser;
		} catch (error) {
			req.flash('errors', error.message);

			await req.session.save();
			return res.redirect('back');

		}
	}
}
