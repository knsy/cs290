
//This is where your Client ID goes instead of NULL:
var clientID = "NULL";

//this is where we will be sending the request. imgur's API
var baseURL = "https://api.imgur.com/3/gallery/t/cats";

//this means we are starting a new request that we will fill 
//with all the necessary goodies.
var request = new XMLHttpRequest();

//this starts filling in the details we put in earlier into our request.
request.open('GET', baseURL, true);

//here we put in our identification for imgur to recognize us
request.setRequestHeader('Authorization', 'Client-ID ' + clientID);

//here we check the response from imgur as soon as it gets back to us
request.addEventListener("load", function() {
  var response = JSON.parse(request.responseText);
  
	//here we put the response code up on the screen
  document.getElementById('response').textContent = response.status;
  console.log(response);
  
  //This gives us a number between 0 and 59.
  //since there are only 60 objects we get back.
  //we'll pick the random one of them.
  var randomCat = Math.floor(Math.random()* 60);
  
  //so, now lets go down that rabbit hole of objects and get the link
  //based on the random cat number we generated above.
  var catLink = response.data.items[randomCat].link;
  
  //display our link and make it point to the link address
  document.getElementById('response').href = catLink;
  document.getElementById('response').textContent = catLink;
})

request.send(null);