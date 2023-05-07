import User from '../models/User';

export default class LoginController{
	static async index(req, res) {
		res.render('login/index');
	}
	static async store(req, res) {
		const { email, name, password } = req.body;
		try {
			const newUser = await User.create({ email, name, password });
            
			res.redirect('/');
			return newUser;
		} catch (error) {
			console.log(error);
		}
	}

}