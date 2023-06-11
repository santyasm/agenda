export default (req, res, next) =>{
	res.locals.csrfToken = req.csrfToken();
	next();
};