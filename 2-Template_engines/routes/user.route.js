var express = require('express');
var router = express.Router();
var db = require('../db');
const shortid = require('shortid');



router.get('/', function(req, res){
	res.render('user/index', {
		users: db.get('users').value()
	});
});

router.get('/search', function(req, res){
	var q = req.query.q;
	var fitleUser = db.get('users').filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('user/index', {
		users : fitleUser.value()
	});
});

router.get('/create', function(req, res){
	res.render('user/create')
});

router.get('/:id', function(req, res){
	var id = req.params.id;
	var user = db.get('users').find({id : id}).value();

	res.render('user/view',{
		user : user
	});

});

router.post('/create',function(req, res){

	req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('/user');
});

module.exports = router;