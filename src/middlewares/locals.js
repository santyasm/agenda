export default (err, req, res, next) => {
	res.locals.errors = req.flash('errors') || null;
	next();
};