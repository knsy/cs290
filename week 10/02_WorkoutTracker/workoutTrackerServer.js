var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js');

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
	res.render('workoutPage', getContext);
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
	res.render('workoutPage', getContext);
})


app.get('/testPost', function(req,res){
	var getContext = {};
	
	res.render('testPage', getContext);
});

app.get('/getTable', function(req,res,next){
	var getContext = {};
	  mysql.pool.query("SELECT * FROM workouts", function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
	console.log(rows);
    context.table = JSON.stringify(rows);
	res.send(context.table);
  });
});
	


//
app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO workouts (`name`) VALUES ('testName')", function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home',context);
  });
});

app.post('/testPost', function(req,res){
	var getContext = {};
	if(req.body){
		console.log(req.body);
	}
	rows = {"jesus":"labia"};
	res.send(JSON.stringify(rows));
});

//RESET TABLE PAGE
app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      
      console.log("Table reset");
	  
    });
	
	mysql.pool.query("INSERT INTO workouts (`name`) VALUES ('testName')", function(err,result){
      context.results = result.insertId;
      console.log(result.insertId);
	  res.render('testPage', context);
	});
 });
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