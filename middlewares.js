module.exports.httpRedirect = function(req, res, next) {

	if(req.headers.host) {

        console.log(req.headers.host);

		// if (req.headers.host.indexOf('https') !== -1) {
		// 	res.redirect(301, 'https://biohigh.com.br' + req.path);
		// 	return
		// }
	}
	
	next();
}