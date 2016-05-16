var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

//setup handlebars for templated rendering
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

//setup POST body processing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//for locating addl data for templates
app.use(express.static(__dirname + '/public'));

//intro page
app.get('/', function(req,res){
	var getContext = {};
	
  res.render('introPage', getContext);
});

//getting the Key page
app.get('/getKey', function(req,res){
	var getContext = {};
	
  res.render('getKeyPage', getContext);
});

//getting the First Contact page
app.get('/firstContact', function(req,res){
	var getContext = {};
	
  res.render('firstContactPage', getContext);
});

//getting the cats page
app.get('/cats', function(req,res){
	var getContext = {};
	
  res.render('catsPage', getContext);
});

//getting the beyond Cats page
app.get('/beyondCats', function(req,res){
	var getContext = {};
	
  res.render('beyondCatsPage', getContext);
});

//getting the reference page
app.get('/reference', function(req,res){
	var getContext = {};
	
  res.render('referencePage', getContext);
});

//getting the imgur API page
app.get('/imgur', function(req,res){
	var getContext = {};
  res.render('imgur', getContext);
});


//404 page if no page found
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

//500 page if everything broked on the server
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});