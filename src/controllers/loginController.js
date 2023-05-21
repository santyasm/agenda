import User from '../models/User';

export default class LoginController {
	static async index(req, res) {
		res.render('login/index');
	}
	static async store(req, res) {
		const { email, name, password, confirmpass } = req.body;
		try {
			if (confirmpass !== password) {
				req.flash('errors_msg', 'Senhas diferentes!');

				await req.session.save();
				return res.redirect('/login/index');
			}

			const newUser = await User.create({ email, name, password });
			req.flash('success_msg', 'Usuário cadastrado com sucesso!');
			await req.session.save();

			res.redirect('/login/index');
			return newUser;
		} catch (error) {
			const errors = error.errors.map(e => e.message);
			req.flash('errors_msg', errors);
			await req.session.save();
			return res.redirect('/login/index');

		}
	}

	static async login(req, res) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ where: { email } });
				
			if (!user) {
				req.flash('errors_msg', 'Usuário não existe.');
				return res.redirect('/login/index');
			} 

			const compare = await user.checkPassword(password);
			if (!compare) {
				req.flash('errors_msg', 'Senha incorreta.');
				return res.redirect('/login/index');
			}

			req.session.user = user.name;
			console.log(req.session.user);

			req.flash('success_msg', 'Olá, ' + req.session.user);
			return res.redirect('/');

		} catch (error) {
			const errors = error.errors.map((e) => e.message);
			req.flash('errors_msg', errors);
			await req.session.save();
			return res.redirect('/login/index');
		}
	}
}
