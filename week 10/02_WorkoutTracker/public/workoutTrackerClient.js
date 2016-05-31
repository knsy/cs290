var requestAddr = "http://52.34.125.250:3000/"; 
//var requestAddr = "http://localhost:3000/";

////////////////////////////ADD/////////////////////////////////////
document.getElementById('postAdd').addEventListener('click', function(event){
    if (document.getElementById('workoutName').value != ""){
		document.getElementById('nameError').textContent = "";
		var req = new XMLHttpRequest();
		var payload = {};
		payload.name = document.getElementById('workoutName').value;
		payload.reps = document.getElementById('workoutReps').value;
		payload.weight = document.getElementById('workoutWeight').value;
		payload.date = document.getElementById('workoutDate').value;
		payload.lbs = document.getElementById('workoutLbs').checked;
		
		req.open('POST', requestAddr + 'insert', true);
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

		}
		else{
			document.getElementById('nameError').textContent = "Really? Your Exercise has no name?"
		}
		
		event.preventDefault();
});

//////////////////////////EDIT SUBMIT/////////////////////////////
document.getElementById('submitEditButton').addEventListener('click', function (event){
		if (document.getElementById('workoutName').value != ""){
			document.getElementById('nameError').textContent = "";
			var req = new XMLHttpRequest();
			var payload = {};
			
			payload.id = document.getElementById('workoutId').value;
			payload.name = document.getElementById('workoutName').value;
			payload.reps = document.getElementById('workoutReps').value;
			payload.weight = document.getElementById('workoutWeight').value;
			payload.date = document.getElementById('workoutDate').value;
			payload.lbs = document.getElementById('workoutLbs').checked;
			
			req.open('POST', requestAddr + 'update', true);
			req.setRequestHeader('Content-Type', 'application/json');
			req.addEventListener('load',function(){
				 if(req.status >= 200 && req.status < 400){
					 var response = JSON.parse(req.response);
					 //console.log(response);
					 
					 //RETURN INPUT BOX TO NORMAL!
					//hide Add btn, show SubmitEdit btn
					document.getElementById('postAdd').hidden = false;
					document.getElementById("submitEditButton").hidden = true;
					document.getElementById('workoutForm').textContent = "Add Exercise:";
				 
					 buildTable(response);
					 
			} else {
				 console.log("Error in network request: " + req.statusText);
			}
			});
			req.send(JSON.stringify(payload));
			//console.log("sent: " + payload);
			
		}else{
			document.getElementById('nameError').textContent = "Really? Your Exercise has no name?"

		}
		event.preventDefault();
}
);



//////////////////////////DELETE//////////////////////////////////
function deleteRow(taskNumber){
    var req = new XMLHttpRequest();
	var payload = {};
	payload.id = taskNumber;
	
	req.open('POST', requestAddr + 'delete', true);
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

	req.open('GET', requestAddr + 'getTable', true);
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
				}else if(cell == 'date'){
					//since the mysql date is a fucking atrocity
					//that includes time, we trim the time out.
					var newTableCell = document.createElement("td");
					var dateLength = 10;
					var fullDate = response[row - 1][cell];
					
					newTableCell.textContent = fullDate.substring(0, dateLength);
					if(response[row - 1][cell] == null){
						newTableCell.textContent = "NA";
					}
					newTableRow.appendChild(newTableCell);
				}else{
					var newTableCell = document.createElement("td");
					newTableCell.textContent = response[row - 1][cell];
					if(response[row - 1][cell] == null){
						newTableCell.textContent = "NA";
					}
					newTableRow.appendChild(newTableCell);
				}
				
			}
				//add DELETE buttons
				var deleteButton = document.createElement('input');
				deleteButton.type = "button";
				deleteButton.value = "Del";
				deleteButton.className = "deleteButton"
				newTableRow.appendChild(deleteButton);
				
				//add EDIT buttons
				var editButton = document.createElement('input');
				editButton.type = "button";
				editButton.value = "Edit";
				editButton.className = "editButton"
				newTableRow.appendChild(editButton);
		}
		document.getElementById("workoutTable").appendChild(newTableRow);
	}
	
	var deleteButtons = document.getElementsByClassName("deleteButton");
	bindDeleteButtons(deleteButtons);
	
	var editButtons = document.getElementsByClassName("editButton");
	bindEditButtons(editButtons);
}

function bindDeleteButtons(deleteButton){	
	
	for (var i = 0; i < deleteButton.length; i++) {
		console.log("binding!!!");
		deleteButton[i].addEventListener('click', function (event){
		var req = new XMLHttpRequest();
		var payload = {};

		payload.id = this.parentNode.name;
		req.open('POST', requestAddr + 'delete', true);
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

function bindEditButtons(editButton){	
	
	for (var i = 0; i < editButton.length; i++) {
		console.log("binding!!!");
		editButton[i].addEventListener('click', function (event){
			var req = new XMLHttpRequest();
			var payload = {};

			payload.id = this.parentNode.name;
			req.open('POST', requestAddr + 'getId', true);
			req.setRequestHeader('Content-Type', 'application/json');
			req.addEventListener('load',function(){
				 if(req.status >= 200 && req.status < 400){
					 var response = JSON.parse(req.response);
					 //console.log(response);

					document.getElementById('workoutId').value = response[0].id;
					document.getElementById('workoutForm').textContent = "Edit Exercise:";
					console.log(response);
					document.getElementById('workoutName').value = response[0].name;
					document.getElementById('workoutReps').value = response[0].reps;
					document.getElementById('workoutWeight').value = response[0].weight;
					document.getElementById('workoutLbs').checked = response[0].lbs;
			
					//since the mysql date is a fucking atrocity
					//that includes time, we trim the time out.
					var dateLength = 10;
					var fullDate = response[0].date;
					document.getElementById('workoutDate').value = fullDate.substring(0, dateLength);
					
					//hide Add btn, show SubmitEdit btn
					document.getElementById('postAdd').hidden = true;
					document.getElementById("submitEditButton").hidden = false;
					
		
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