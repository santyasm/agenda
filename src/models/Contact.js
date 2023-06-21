import Sequelize, { Model } from 'sequelize';

export default class Contact extends Model {
	constructor(usuarioLogadoId) {
		super();
		this.userId = usuarioLogadoId;
	}
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
					defaultValue: this.userId,
					allowNull: false
				}
			},
			{ sequelize }
		);
		return this;
	}
	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'user_id'});
	}
}
