var express = require('express');
var session = require('express-session');
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

//setting up sessions. minimum is just the secret that should be random and secret.
app.use(session({secret:'TheSecretThatShouldBeSecret'}));

//processing the GET requests
app.get('/', function(req,res){
	var getContext = {};
	
	//if there is no session, show main page.
	if(!req.session.name){
		res.render('newSessionPage', getContext);
		return;
	}
	getContext.name = req.session.name;
	getContext.toDoCount = req.session.toDo.length || 0;
	getContext.toDo = req.session.toDo || [];
	
	//for debug
	console.log(context.toDo);
	res.render('toDoPage', getContext);
});

app.post('/', function(req,res){
	var getContext = {};
	
	if(req.body['New List']){
		req.session.name = req.body.name;
		req.session.toDo = [];
		req.session.curId = 0;
	}
	
	//if the is no session, ask for the name to start one
	if(!req.session.name){
		res.render('newSessionPage', getContext);
		return;
	}
	
	if(req.body['Add Item']){
		req.session.toDo.push({"name":req.body.name, "id":req.session.curId});
		req.session.curId++;
	}
	
	if(req.body['Done']){
		req.session.toDo = req.session.toDo.filter(function(e){
			return e.id != req.body.id;
		})
	}
	
	getContext.name = req.session.name;
	getContext.toDoCount = req.session.toDo.length;
	getContext.toDo = req.session.toDo;
	
	console.log(getContext.toDo);
	res.render('toDoPage', getContext);
})

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