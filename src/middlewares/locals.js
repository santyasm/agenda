export default (req, res, next) => {
	res.locals.errors = req.flash('errors') || null;
	next();
};