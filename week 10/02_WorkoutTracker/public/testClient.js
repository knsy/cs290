document.getElementById('postSubmit').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
	var payload = {};
	payload.name = document.getElementById('workoutName').value;
	console.log(payload.name);
	req.open('POST', 'http://localhost:3000/testPost', true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		 if(req.status >= 200 && req.status < 400){
			 var response = JSON.parse(req.responseText);
			 console.log(response);
	} else {
		 console.log("Error in network request: " + request.statusText);
	}
	});
	req.send(JSON.stringify(payload));
	console.log("sent: " + payload);
	event.preventDefault();
})

//on page load get table
function onPageLoadAdd(){
    var req = new XMLHttpRequest();

	req.open('GET', 'http://localhost:3000/insert', true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		 if(req.status >= 200 && req.status < 400){
			 //var response = JSON.parse(req.table);
			 console.log(req);
	} else {
		 console.log("Error in network request: " + request.statusText);
	}
	});
	req.send(null);
	//event.preventDefault();
}

//on page load get table
function onPageLoadGet(){
	console.log("body loaded.")
    var req = new XMLHttpRequest();

	req.open('GET', 'http://localhost:3000/getTable', true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		 if(req.status >= 200 && req.status < 400){
			 //var response = JSON.parse(req.table);
			 console.log(req);
	} else {
		 console.log("Error in network request: " + request.statusText);
	}
	});
	req.send(null);
	//event.preventDefault();
}

onPageLoadAdd();
onPageLoadGet();