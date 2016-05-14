var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

//processing the GET requests
app.get('/', function(req,res){
	getValues = [];
	for(var entry in req.values){
	getValues.push({"name" : entry, "value" : req.query[entry]});		
	}
	
	var getContext = {};
	getContext.entries = gatValues;
	
  res.render('getPage', getContext);
});

app.post('/', function(req,res){
  res.render('getPage', numberContext());
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