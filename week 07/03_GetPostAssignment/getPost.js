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
app.use(bosyParser.json());

//processing the GET requests
app.get('/', function(req,res){
	var getValues = [];
	for(var entry in req.query){
		getValues.push({"name" : entry, "value" : req.query[entry]});		
	}
	console.log(getValues);
	var getContext = {};
	getContext.entries = getValues;
	
  res.render('getPage', getContext);
});

//processing POST requests
app.post('/', function(req,res){
	var postValues = [];
	for(var entry in req.body){
		postValues.push({"name" : entry, "value" : req.body[entry]});
	}
	
	var postContext = {};
	postContext.entries = postValues;
  res.render('postPage', postContext);
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