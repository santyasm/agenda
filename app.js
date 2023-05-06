import express from 'express';
import indexRoute from './src/routes/indexRoute';
import loginRoute from './src/routes/loginRoute';
import errorHandler from './src/middlewares/errorHandler';

class App{
	constructor() {
		this.app = express();
		this.configureMiddlewares();
		this.configureRoutes();
	}

	configureMiddlewares() {
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.json());
		this.app.set('view engine', 'ejs');
		this.app.set('views', 'src/views');
		this.app.use(errorHandler);
	}
    
	configureRoutes() {
		this.app.use('/', indexRoute);
		this.app.use('/login', loginRoute);
	}
}

export default new App().app;