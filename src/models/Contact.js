import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

export default class Contact extends Model {
	static init(sequelize, userId) {
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
				telephone: {
					type: Sequelize.STRING,
					allowNull: false
				},
				birthday: {
					type: Sequelize.DATE,
				},
				user_id: {
					type: Sequelize.INTEGER,
					defaultValue: userId,
					allowNull: false
				}
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
