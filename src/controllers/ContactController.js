import Contact from '../models/Contact';


export default class IndexController{
	static async index(req, res) {
		res.render('contact/index');
	}
	
	static async store(req, res){
		const {name, email, telephone, birthday} = req.body;

		try {
			const user_id = req.session.user.id;

			const newContact = await Contact.create({name,
				email,
				birthday,
				telephone,
				user_id
			});

			req.flash('success_msg', 'Contato cadastrado com sucesso!');
			
			res.redirect('/');
			return newContact;
		} catch (error) {
			req.flash('errors_msg', error.message);
			res.redirect('/');
		}
		
	}
}