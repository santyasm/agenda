import Contact from '../models/Contact';


export default class IndexController{
	static async index(req, res) {
		try {
			const userId = req.session.user ? req.session.user.id : null;

			const contacts = await Contact.findAll({where: {user_id: userId }
			});
			res.render('contact/index', { contacts });
		} catch (error) {
			console.log(error.message);
			res.status(500).send('Erro ao buscar contatos');
		}
		
	}
	
	static async store(req, res){
		const {name, email, telephone, birthday} = req.body;

		try {
			const userId = req.session.user ? req.session.user.id : null;
			const user_id = userId;

			const newContact = await Contact.create({name,
				email,
				birthday,
				telephone,
				user_id
			});

			req.flash('success_msg', 'Contato cadastrado com sucesso!');
			
			res.redirect('/contact/index');
			return newContact;
		} catch (error) {
			req.flash('errors_msg', error.message);
			res.redirect('/');
		}
		
	}
}