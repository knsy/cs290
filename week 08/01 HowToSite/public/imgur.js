
//This is where your Client ID goes instead of NULL:
var clientID = "NULL";

//this is where we will be sending the request. imgur's API
var baseURL = "https://api.imgur.com/3/gallery/search/?q=";
//this will be our search term
var apiSearch = "cats";

//this means we are starting a new request that we will fill 
//with all the necessary goodies.
var request = new XMLHttpRequest();

//this starts filling in the details we put in earlier into our request.
//and combines our url and search word together
request.open('GET', baseURL + apiSearch, true);

//here we put in our identification for imgur to recognize us
request.setRequestHeader('Authorization', 'Client-ID ' + clientID);

//here we check the response from imgur as soon as it gets back to us
//notice that we broke the code out into a separate function
//this is to keep the same code for when the page loads and when 
//the button is clicked
request.addEventListener("load", function() {
	loadImage();
})

request.send(null);

//here we keep track of when our button is clicked.
document.getElementById('moreRandomImgur').addEventListener('click', loadImage);

function loadImage(){
	var response = JSON.parse(request.responseText);
  
  //for debugging purpouses we output the response to the console
  console.log(response);
  
  //the object that we get back includes a field that
  //specifies the size of the response, so we will 
  //pick the random one from 0 to the (number of search terms returned - 1)
  //this gives us an index to jump into the results array.
  //Another important thing here is that we keep picking random numbers
  //until the resulting index in the array is not an album
  //because we can't display albums
  var searchResponseSize = response.data.length;
  do{ 
		var randomCat = Math.floor(Math.random()* searchResponseSize);
  } while(response.data[randomCat].is_album == true);
  
  //so, now we get the image link
  var catLink = response.data[randomCat].link;
  
  //put our link into the src field of the image placeolder. 
    document.getElementById('randomImage').src = catLink;
};