var db = require('../db');
const shortid = require('shortid');



module.exports.index = function(req, res){
	res.render('user/index', {
		users: db.get('users').value()
	});
};

module.exports.search = function(req, res){
	var q = req.query.q;
	var fitleUser = db.get('users').filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('user/index', {
		users : fitleUser.value()
	});
};

module.exports.create = function(req, res){
	res.render('user/create')
};

module.exports.getId = function(req, res){
	var id = req.params.id;
	var user = db.get('users').find({id : id}).value();

	res.render('user/view',{
		user : user
	});

};

module.exports.postCreate = function(req, res){
	req.body.id = shortid.generate();
	var errors = [];

	if(!req.body.name){
		errors.push('Name is false');
	}

	if(!req.body.phone){
		errors.push('Phone is false');
	}

	if (errors.length){
		res.render('user/create',{
			errors : errors,
			values : req.body
		});
		return;
	}
	db.get('users').push(req.body).write();
	res.redirect('/user');
};
