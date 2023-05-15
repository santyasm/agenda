export default (req, res, next) => {
	res.locals.errors_msg = req.flash('errors_msg');
	next();
};