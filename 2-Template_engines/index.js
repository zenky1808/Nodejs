const express = require('express');

const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function (req,res){
	res.render('index',{
		name : 'The Anh'
	});
});

app.get('/user', function(req, res){
	res.render('user/index', {
		users: [
			{id :1 , name : 'The Anh'},
			{id :2 , name: 'Thanh'}
		]
	});
});

app.listen(port ,function(){
	console.log('Example app listening on port ' + port)
});