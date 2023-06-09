import User from '../models/User';
import jwt from "jsonwebtoken";

export default class LoginController {
	static async index(req, res) {
		res.render('login/index');
	}
	static async register(req, res) {
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

			const {id, name} = user;

			//req.session.user = user;

			const token = await jwt.sign(
				{id, name, email}, 
				process.env.TOKEN_KEY,
				{expiresIn: "1d"}
			)

			res.cookie("token", token, {maxAge: 360000000, httpOnly: true, secure: false});

			req.flash('success_msg', 'Olá, ' + name);
			return res.redirect('/');

		} catch (error) {

			console.log(error)
			// const errors = error.errors.map((e) => e.message);
			// req.flash('errors_msg', errors);
			//await req.session.save();
			return res.redirect('/login/index');
		}
	}

	static async logout(req, res) {
		req.session.destroy();
		res.redirect('/');
	}
}
