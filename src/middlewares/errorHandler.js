export default (err, req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	res.render('404');
	next(error);
};
