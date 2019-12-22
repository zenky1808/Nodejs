const express = require('express');

const app = express();

const port = 3000;

app.get('/', function (req,res){
	res.send('Hello World');
});

app.get('/user', function(req, res){
	res.send('Hello wellcome to user');
});

app.listen(port ,function(){
	console.log('Example app listening on port ' + port)
});