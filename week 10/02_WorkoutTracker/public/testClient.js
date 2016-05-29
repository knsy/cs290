////////////////////////////ADD/////////////////////////////////////
document.getElementById('postAdd').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
	var payload = {};
	payload.name = document.getElementById('workoutName').value;
	payload.reps = document.getElementById('workoutReps').value;
	payload.weight = document.getElementById('workoutWeight').value;
	payload.date = document.getElementById('workoutDate').value;
	
	req.open('POST', 'http://localhost:3000/insert', true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		 if(req.status >= 200 && req.status < 400){
			 var response = JSON.parse(req.response);
			 //console.log(response);
			 
			 buildTable(response);
			 
	} else {
		 console.log("Error in network request: " + request.statusText);
	}
	});
	req.send(JSON.stringify(payload));
	//console.log("sent: " + payload);
	event.preventDefault();
});

//////////////////////////DELETE//////////////////////////////////
function deleteRow(taskNumber){
    var req = new XMLHttpRequest();
	var payload = {};
	payload.id = taskNumber;
	
	req.open('POST', 'http://localhost:3000/delete', true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		 if(req.status >= 200 && req.status < 400){
			 var response = JSON.parse(req.response);
			 //console.log(response);
			 
			 buildTable(response);
			 
	} else {
		 console.log("Error in network request: " + request.statusText);
	}
	});
	req.send(JSON.stringify(payload));
	//console.log("sent: " + payload);
	//event.preventDefault();
};

//on page load get table
function onPageLoadGet(){
	console.log("body loaded.")
    var req = new XMLHttpRequest();

	req.open('GET', 'http://localhost:3000/getTable', true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		 if(req.status >= 200 && req.status < 400){
			 var response = JSON.parse(req.response);
			 //console.log(response);
			 
			 buildTable(response);
			 
	} else {
		 console.log("Error in network request: " + request.statusText);
	}
	});
	req.send(null);
	//event.preventDefault();
}

onPageLoadGet();


//BUILD THE TABLE BASED ON DATA RECEIVED BACK
function buildTable(response){
	var table = document.getElementById("workoutTable");
	
	while(table.firstChild){
		table.removeChild(table.firstChild);
	}
	
	console.log(response);
	
	for(var row = 0; row <= response.length; row++){
		var newTableRow = document.createElement("tr");
		if(row == 0){
				var newHeader1 = document.createElement("th");
				newHeader1.textContent = "Name";
				newTableRow.appendChild(newHeader1);
				
				var newHeader2 = document.createElement("th");
				newHeader2.textContent = "Reps";
				newTableRow.appendChild(newHeader2);
				
				var newHeader3 = document.createElement("th");
				newHeader3.textContent = "Weight";
				newTableRow.appendChild(newHeader3);
				
				var newHeader4 = document.createElement("th");
				newHeader4.textContent = "Date";
				newTableRow.appendChild(newHeader4);
				
				var newHeader5 = document.createElement("th");
				newHeader5.textContent = "lb?";
				newTableRow.appendChild(newHeader5);
		}else{
			for(var cell in response[row - 1]){
				if(!response[row - 1].hasOwnProperty(cell)) {
					continue;
				}
				
				if(cell == 'id'){
					newTableRow.name = response[row - 1][cell];
				}else{
					var newTableCell = document.createElement("td");
					newTableCell.textContent = response[row - 1][cell];
					if(response[row - 1][cell] == null){
						newTableCell.textContent = "NA";
					}
				newTableRow.appendChild(newTableCell);
				}
				
			}
				//add buttons
				var deleteButton = document.createElement('input');
				deleteButton.type = "button";
				deleteButton.value = "Del";
				deleteButton.className = "deleteButton"
				newTableRow.appendChild(deleteButton);
		}
		document.getElementById("workoutTable").appendChild(newTableRow);
	}
	
	var deleteButtons = document.getElementsByClassName("deleteButton");
	bindButtons(deleteButtons);
}

function bindButtons(deleteButton){	
	
	for (var i = 0; i < deleteButton.length; i++) {
		console.log("binding!!!");
		deleteButton[i].addEventListener('click', function (event){
		var req = new XMLHttpRequest();
		var payload = {};
		console.log("i: " + i);
		console.log("dlt: " + deleteButton);
		console.log("dlt[i]: " + deleteButton[i]);
		payload.id = this.parentNode.name;
		req.open('POST', 'http://localhost:3000/delete', true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load',function(){
			 if(req.status >= 200 && req.status < 400){
				 var response = JSON.parse(req.response);
				 //console.log(response);
				 
				 buildTable(response);
				 
		} else {
			 console.log("Error in network request: " + request.statusText);
		}
		});
		req.send(JSON.stringify(payload));
		//console.log("sent: " + payload);
		event.preventDefault();
}
);
}
}

