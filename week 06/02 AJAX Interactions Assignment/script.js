var apiKey = "null";
//Place your OpenMap Key here.


var apiReq = new XMLHttpRequest(); 
var weatherApiResp;


//search by city name
//similar structure as the request above.
document.getElementById('getWeather').addEventListener('click', function(event){
	if(document.getElementById('weatherZip').value != ""){
		var url = "http://api.openweathermap.org/data/2.5/weather?zip="
		url += document.getElementById('weatherZip').value;
		url += ",us"; 	//In case we need to change the country
		url += "&units=metric"; 	 //In case we need to change to Imperial. Default is Kelvin.
		url += "&appid="; 
		url += apiKey;
		
	}else{
		//these should provavly be collapsed into a single line, but for clarity
		//broken up into many	
		var url = "http://api.openweathermap.org/data/2.5/weather?q="
		url += document.getElementById('weatherCity').value;
		url += "&units=metric";	 //In case we need to change to Imperial. Default is Kelvin.
		url += "&appid="; 
		url += apiKey;
	}
	
	//sending an asynchronous request
	apiReq.open('GET', url, true);
	apiReq.addEventListener('load', function(){
		//making sure that the status code is between 200 and 400.
		//this signifies that everything was successful most likely.
		//>400 is generally errors.
		if(apiReq.status >= 200 && apiReq.status < 400){
			weatherApiResp = JSON.parse(apiReq.responseText);
			
			//display the temp
			document.getElementById('weatherImg').src = "http://openweathermap.org/img/w/" + weatherApiResp.weather[0].icon + ".png";
			document.getElementById('temperature').textContent = weatherApiResp.main.temp + " degrees C";
			document.getElementById('humidity').textContent = weatherApiResp.main.humidity + "%";
			document.getElementById('city').textContent = weatherApiResp.name;
			
			document.getElementById('weatherZip').value = null;
			document.getElementById('weatherCity').value = null;
		}else{
			console.log("Error: " + apiReq.status + apiReq.statusText);
		}
	
	})
	apiReq.send(null);
	
	
	
	//make sure that the button doesnt refresh the page
	event.preventDefault();
});


//submit POST request to httpBin
document.getElementById('postSubmit').addEventListener('click', function(event){
	//build up the url
	var url = "http://httpbin.org/post";
	var payload = {text:null};
	var httpbinApiResp;
	
	payload.text = document.getElementById('httpbinInput').value;
	
	
	apiReq.open('POST', url, true);
	apiReq.setRequestHeader('content-type', 'application/json');
	apiReq.addEventListener('load', function(){
		if(apiReq.status >= 200 && apiReq.status < 400){
			//all is good, got data back 
			httpbinApiResp = JSON.parse(apiReq.responseText);
			document.getElementById('httpbinReturn').textContent = httpbinApiResp.data;
		}else{
			console.log("Error: " + apiReq.status + " " + apiReq.statusText);
		}
		
	})
	
	apiReq.send(JSON.stringify(payload));
	
	event.preventDefault();
	
})


