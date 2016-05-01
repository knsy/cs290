
function asTabs(node) {
	//new array to store the nodes that we will need to access later
	//after the buttons are added in
	var arrayOfChildren = new Array();
	
	//populate the array
	//at this point in time, the elements that we need to find
	//are all distinguished with nodeType, but just in case
	//we also filter elements that have an attribute that we need
	for (var child in node.children){
		if(node.children[child].nodeType == 1){
			if (node.children[child].hasAttribute("data-tabname")){
				arrayOfChildren.push(node.children[child]);
			}
		}
	}
	

	//this function will be used to hide the element and
	//then reveal the element if the index matches the one that has been passed in.
	//feels a little backwards...
	function hideOthers (selectIndex){
		for (var i in arrayOfChildren){
			if (arrayOfChildren[i].nodeType == 1){
				arrayOfChildren[i].style.display = "none";
				if(arrayOfChildren[i].attributes["data-tabname"].value == 
				arrayOfChildren[selectIndex].attributes["data-tabname"].value){
					arrayOfChildren[i].style.display = "block";
				}
			
			}
		}
		
	}
	
	// creating buttons based on the number of elements 
	arrayOfChildren.forEach(makeButtons);
	function makeButtons(element, i, array) {
		var newButton = document.createElement("button");
		newButton.textContent = arrayOfChildren[i].attributes["data-tabname"].value;
		console.log(i);
		newButton.addEventListener("click", function(){hideOthers(i);});
		
		//inserts the buttons before the conctent that will 
		//be used as tab content... but backwards... : D
		node.insertBefore(newButton, node.firstChild);

	}
	
	console.log(arrayOfChildren[0].innerText);
	console.log("Length POST: " + arrayOfChildren.length);
}

asTabs(document.querySelector("#wrapper"));
