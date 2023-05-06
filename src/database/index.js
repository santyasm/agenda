import Sequelize from 'sequelize';
import databaseConfig from '../config/databaseConfig';
import User from '../models/User';

const models = [User];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));