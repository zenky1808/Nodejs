const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var userRoute =  require('./routes/user.route.js');

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

app.use('/user', userRoute);

app.listen(port ,function(){
	console.log('Example app listening on port ' + port);
});