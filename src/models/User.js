import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

export default class User extends Model {
	static init(sequelize) {
		super.init(
			{
				name: {
					type: Sequelize.STRING,
					defaultValue: '',
					validate: {
						len: {
							args: [3, 255],
							msg: 'Nome deve conter de 3 a 255 caracteres.',
						},
					},
				},
				email: {
					type: Sequelize.STRING,
					defaultValue: '',
					unique: {
						msg: 'Email já existe.',
					},
					validate: {
						isEmail: {
							msg: 'Email inválido.',
						},
					},
				},
				password_hash: {
					type: Sequelize.STRING,
					defaultValue: '',
				},
				password: {
					type: Sequelize.VIRTUAL,
					defaultValue: '',
					validate: {
						len: {
							args: [6, 50],
							msg: 'Senha deve conter de 6 a 50 caracteres.',
						},
					},
				},
			},
			{ sequelize }
		);
		this.addHook('beforeSave', async (user) => {
			user.password_hash = await bcrypt.hash(user.password, 8);
		});
		return this;
	}

	async checkPassword(password) {
		return bcrypt.compare(password, this.password_hash);
	}
}
