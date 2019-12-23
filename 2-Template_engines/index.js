const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const shortid = require('shortid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: []})
  .write()


const port = 3000;


app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req,res){
	res.render('index',{
		name : 'The Anh'
	});
});

app.get('/user', function(req, res){
	res.render('user/index', {
		users: db.get('users').value()
	});
});

app.get('/user/search', function(req, res){
	var q = req.query.q;
	var fitleUser = db.get('users').filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('user/index', {
		users : fitleUser.value()
	});
});

app.get('/user/create', function(req, res){
	res.render('user/create')
});

app.get('/user/:id', function(req, res){
	var id = req.params.id;
	var user = db.get('users').find({id : id}).value();

	res.render('user/view',{
		user : user
	});

});

app.post('/user/create',function(req, res){

	req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('/user');
});

app.listen(port ,function(){
	console.log('Example app listening on port ' + port);
});