var db = require('../db');

module.exports.requireAuth = function(req, res, next){
	if(!req.cookies.userID){
		res.redirect('/auth/login');
		return;
	}
	var user = db.get('user').find({id: req.cookies.userID}).value();
	if(user){
		res.redirect('/auth/login');
		return;
	}
	next();
};