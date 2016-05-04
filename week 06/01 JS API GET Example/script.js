var apiKey = "NULL";
//Place your OpenMap Key here.

// We create a new table element which we will later place into the DOM
var newTable = document.createElement("table");

// New row. Could have used nested loops if I had more rows.
var tableRow1 = document.createElement("tr");
var tableRow2 = document.createElement("tr");
var tableRow3 = document.createElement("tr");

var zipcodes = ["94588","10511","95330","92101"];

var apiReq = new XMLHttpRequest(); 
var apiResp;

// Creating the headers and data cells and appending them to rows
// that we just created
for(var i = 0; i < 3; i++){
	var url = "http://api.openweathermap.org/data/2.5/weather?zip="
	url += zipcodes[i];
	url += ",us";
	url += "&units=metric";
	url += "&appid="; 
	url += apiKey;
	
	apiReq.open("GET",url, false);
	apiReq.send(null);
	apiResp = (JSON.parse(apiReq.responseText));
	
	
	var newTableHeader = document.createElement("th");
	newTableHeader.textContent = apiResp.name;
	tableRow1.appendChild(newTableHeader);
	
	var newTableData = document.createElement("td");
	newTableData.textContent = zipcodes[i];
	tableRow2.appendChild(newTableData);
	
	var newTableData = document.createElement("td");
	newTableData.textContent = apiResp.main.temp;
	tableRow3.appendChild(newTableData);
}

// attaching rows to table
newTable.appendChild(tableRow1);
newTable.appendChild(tableRow2);
newTable.appendChild(tableRow3);

// attaching the table to our "tableWrapper" div 
document.getElementById("tableWrapper").appendChild(newTable);

//--------------------------Here we will process buttons--------

document.getElementById('zipSubmit').addEventListener('click',function(event){
	var url = "http://api.openweathermap.org/data/2.5/weather?zip="
	url += document.getElementById('weatherZip').value;
	url += ",us";
	url += "&units=metric";
	url += "&appid="; 
	url += apiKey;
	
	apiReq.open('GET', url, false);
	apiReq.send(null);
	
	apiResp = JSON.parse(apiReq.responseText);
	
	document.getElementById('inputMethod').textContent = document.getElementById('weatherZip').value;
	document.getElementById('temperature').textContent = apiResp.main.temp + " degrees C";
	
	event.preventDefault();
});
document.getElementById('citySubmit').addEventListener('click', function(event){
	var url = "http://api.openweathermap.org/data/2.5/weather?zip="
	url += document.getElementById('weatherCity').value;
	url += "&units=metric";
	url += "&appid="; 
	url += apiKey;
	
	apiReq.open('GET', url, false);
	apiReq.send(null);
	
	apiResp = JSON.parse(apiReq.responseText);
	
	document.getElementById('inputMethod').textContent = document.getElementById('weatherCity').value;
	document.getElementById('temperature').textContent = apiResp.main.temp + " degrees C";
	
	event.preventDefault();
});



