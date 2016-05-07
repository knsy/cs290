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
	//build up the URL
	var url = "http://api.openweathermap.org/data/2.5/weather?zip="
	url += zipcodes[i];
	url += ",us";  //In case we need to change the country
	url += "&units=metric"; //In case we need to change to Imperial. Default is Kelvin.
	url += "&appid="; 
	url += apiKey;
	
	//GET the data back based on the URL we built up.
	apiReq.open("GET",url, false);
	apiReq.send(null);
	apiResp = (JSON.parse(apiReq.responseText));
	
	//FIll in the table header with the name of the city.
	var newTableHeader = document.createElement("th");
	newTableHeader.textContent = apiResp.name;
	tableRow1.appendChild(newTableHeader);
	
	//fill in the second row with the zipcodes we put in.
	var newTableData = document.createElement("td");
	newTableData.textContent = zipcodes[i];
	tableRow2.appendChild(newTableData);
	
	//fill in the third row with the actual temperature data.
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
// here we try to get the zipcode or a city name form the user and use that data to get the current temperature.


//search by zipcode
document.getElementById('zipSubmit').addEventListener('click',function(event){
	var url = "http://api.openweathermap.org/data/2.5/weather?zip="
	url += document.getElementById('weatherZip').value;
	url += ",us"; 	//In case we need to change the country
	url += "&units=metric"; 	 //In case we need to change to Imperial. Default is Kelvin.
	url += "&appid="; 
	url += apiKey;
	
	apiReq.open('GET', url, true);
	apiReq.addEventListener('load', function(){
		if(apiReq.status >= 200 && apiReq.status < 400){
			apiResp = JSON.parse(apiReq.responseText);
			
			//display the response
			document.getElementById('temperature').textContent = apiResp.main.temp + " degrees C";
		}else{
			console.log("Error: " + apiReq.statusText);
		}})
	
	apiReq.send(null);
	
	//display the parsed temperature for the zipcode we looked for
	document.getElementById('inputMethod').textContent = document.getElementById('weatherZip').value;

	
	//make sure that the button doesnt refresh the page
	event.preventDefault();
});

//search by city name
document.getElementById('citySubmit').addEventListener('click', function(event){
	var url = "http://api.openweathermap.org/data/2.5/weather?zip="
	url += document.getElementById('weatherCity').value;
	url += "&units=metric";	 //In case we need to change to Imperial. Default is Kelvin.
	url += "&appid="; 
	url += apiKey;
	
	apiReq.open('GET', url, true);
	apiReq.addEventListener('load', function(){
		if(apiReq.status >= 200 && apiReq.status < 400){
			apiResp = JSON.parse(apiReq.responseText);
			
			//display the temp
			document.getElementById('temperature').textContent = apiResp.main.temp + " degrees C";
		}else{
			console.log("Error: " + apiReq.statusText);
		}
	
	})
	apiReq.send(null);
	
	
	 //display the temperature for the city we looked for.
	document.getElementById('inputMethod').textContent = document.getElementById('weatherCity').value;
	
	
	//make sure that the button doesnt refresh the page
	event.preventDefault();
});



