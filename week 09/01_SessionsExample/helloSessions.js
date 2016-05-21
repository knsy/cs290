var express = require('express');
var session = require('express-session');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

//setup handlebars for templated rendering
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

//setting up sessions. minimum is just the secret that should be random and secret.
app.use(session({secret:'TheSecretThatShouldBeSecret'}));

//processing the GET requests
app.get('/session', function(req,res){
	var getContext = {};
	getContext.count = req.session.count || 0;
	req.session.count++;
	
  res.render('sessionPage', getContext);
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