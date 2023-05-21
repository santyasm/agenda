import express from 'express';
import 'dotenv/config';
import indexRoute from './src/routes/indexRoute';
import loginRoute from './src/routes/loginRoute';
import errorHandler from './src/middlewares/errorHandler';
import flash from 'connect-flash';
import session from 'express-session';
import locals from './src/middlewares/locals';

class App{
	constructor() {
		this.app = express();
		this.configureMiddlewares();
		this.configureRoutes();
	}

	configureMiddlewares() {
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.json());
		
		this.app.use(
			session({ secret: process.env.SECRET_SESSION,resave: false , saveUninitialized: false, cookie: { maxAge: 30000 } })
		);
		this.app.use(flash());
		
		this.app.set('view engine', 'ejs');
		this.app.set('views', 'src/views');

		this.app.use(errorHandler);
		this.app.use(locals);
	}
    
	configureRoutes() {
		this.app.use('/', indexRoute);
		this.app.use('/login', loginRoute);
	}
}

export default new App().app;