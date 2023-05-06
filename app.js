import express from 'express';
import indexRoute from './src/routes/indexRoute';

class App{
	constructor() {
		this.app = express();
		this.congigureMiddlewares();
		this.congigureRoutes();
	}

	congigureMiddlewares() {
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.json());
		this.app.set('view engine', 'ejs');
		this.app.set('views', 'src/views');
	}
    
	congigureRoutes() {
		this.app.use('/', indexRoute);
	}
}

export default new App().app;