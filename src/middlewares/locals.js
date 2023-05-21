export default (req, res, next) => {
	res.locals.USER = req.session.user;
	res.locals.errors_msg = req.flash('errors_msg');
	res.locals.success_msg = req.flash('success_msg');
	next();
};