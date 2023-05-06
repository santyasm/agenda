require('dotenv').config();

module.exports = {
	dialect: 'mysql',
	database: process.env.DB_NAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	define: {
		timestamps: true,
		underscodered: true,
		underscoderedAll: true,
		createdAt: 'created_at',
		updatedAt: 'updeated_at',
	},
	dialectOptions: {
		timezone: '-03:00',
	},
	timezone: '-03:00',
};