import express from 'express';
import 'dotenv/config';
import indexRoute from './src/routes/indexRoute';
import loginRoute from './src/routes/loginRoute';
import errorHandler from './src/middlewares/errorHandler';
import flash from 'connect-flash';
import session from 'express-session';

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
		this.app.use(
			session({ secret: process.env.SECRET_SESSION,resave: false , saveUninitialized: true, cookie: { maxAge: 30000 } })
		);

		this.app.use((err, req, res, next) => {
			res.locals.SUCCESS_MSG = req.flash('succes_msg');
			res.locals.error_msg = req.flash('error_msg') || null;
			next();
		});

		this.app.use(flash());
	}
    
	configureRoutes() {
		this.app.use('/', indexRoute);
		this.app.use('/login', loginRoute);
	}
}

export default new App().app;