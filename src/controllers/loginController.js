import flash from 'express-flash';
import User from '../models/User';

export default class LoginController {
	static async index(req, res) {
		res.render('login/index', {errors: flash('errors')});
	}
	static async store(req, res) {
		const { email, name, password, confirmpass } = req.body;
		try {
			if (confirmpass !== password) {
				req.flash('errors_msg', 'Senhas diferentes!');

				await req.session.save();
				return res.redirect('/login/index');
			}

			// req.flash('success', 'Usuário cadastrado com sucesso!');
			const newUser = await User.create({ email, name, password });
			await req.session.save();

			res.redirect('/');
			return newUser;
		} catch (error) {
			const errors = error.errors.map(e => e.message);

			req.flash('errors_msg', errors);
			console.log(error);

			await req.session.save();
			return res.redirect('/login/index');

		}
	}
}
