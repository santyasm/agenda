import Sequelize from 'sequelize';
import databaseConfig from '../config/databaseConfig';
import User from '../models/User';
import Contact from '../models/Contact';

const models = [User, Contact];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));