const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var userRoute =  require('./routes/user.route.js');
var authRoute = require('./routes/auth.route.js');
var authMiddleware = require('./middlewares/auth.middleware.js');
var cookieParser = require('cookie-parser');

const port = 3000;


app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.get('/', function (req,res){
	res.render('index',{
		name : 'The Anh'
	});
});

app.use('/user', authMiddleware.requireAuth ,userRoute);
app.use('/auth', authRoute);
app.listen(port ,function(){
	console.log('Example app listening on port ' + port);
});