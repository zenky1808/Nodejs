const express = require('express');

const app = express();

const port = 3000;

var users = [
	{id :1 , name : 'The Anh'},
	{id :2 , name: 'Thanh'},
	{id :3 , name: 'Hoang'},
	{id :4 , name: 'Luc'}
]
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function (req,res){
	res.render('index',{
		name : 'The Anh'
	});
});

app.get('/user', function(req, res){
	res.render('user/index', {
		users: users
	});
});

app.get('/user/search', function(req, res){
	var q = req.query.q;
	var fitleUser = users.filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('user/index', {
		users : fitleUser
	});
});

app.listen(port ,function(){
	console.log('Example app listening on port ' + port);
});