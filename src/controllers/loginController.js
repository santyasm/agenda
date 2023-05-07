import User from '../models/User';

export default class LoginController{
	static async index(req, res) {
		res.render('login/index');
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
			console.log(error);
		}
	}

}