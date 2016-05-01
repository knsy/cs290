//it works, but so much cleanup possible.... 

// We create a new table element which we will later place into the DOM
var newTable = document.createElement("table");

// New rows
for(var row = 0; row < 4; row++){
	var newTableRow = document.createElement("tr");
	
	// Creating the headers and data cells and appending them to rows
	// that we just created
	for(var cell = 0; cell < 4; cell++){
		
	//fill the header row with header cells
		if(row == 0){
			var newTableHeader = document.createElement("th");
			newTableHeader.textContent = "Header " + (cell + 1);
			newTableRow.appendChild(newTableHeader);
		} else{
			
	//fill the rest with normal data cells
			var newTableData = document.createElement("td");
			newTableData.textContent = (cell + 1) + "," + (row);
			newTableRow.appendChild(newTableData);
		}
	}
	
	// attaching rows to table
	newTable.appendChild(newTableRow);
	
}

// attaching the table to our "tableWrapper" div 
document.getElementById("tableWrapper").appendChild(newTable);

//default selection is the top left data cell.
var currentSelection = document.getElementsByTagName("td")[0];
currentSelection.style.backgroundColor = "yellow";
currentSelection.style.border = "solid";

//make buttons Mark, Left, Down, Up, Right
//Left button.
var buttonLeft = document.createElement("button");
buttonLeft.textContent = "Left";
buttonLeft.addEventListener("click", moveSelectionLeft);
document.getElementById("tableWrapper").appendChild(buttonLeft);

//Down button.
var buttonDown = document.createElement("button");
buttonDown.textContent = "Down";
buttonDown.addEventListener("click", moveSelectionDown);
document.getElementById("tableWrapper").appendChild(buttonDown);

//Up button.
var buttonUp = document.createElement("button");
buttonUp.textContent = "Up";
buttonUp.addEventListener("click", moveSelectionUp);
document.getElementById("tableWrapper").appendChild(buttonUp);

//Right button.
var buttonRight = document.createElement("button");
buttonRight.textContent = "Right";
buttonRight.addEventListener("click", moveSelectionRight);
document.getElementById("tableWrapper").appendChild(buttonRight);

//add break to separate out the mark button
document.getElementById("tableWrapper").appendChild(document.createElement("br"));

//Mark button
var buttonMark = document.createElement("button");
buttonMark.textContent = "Mark Cell";
buttonMark.addEventListener("click", markSelection);
document.getElementById("tableWrapper").appendChild(buttonMark);

//Permanently mark the cell by encasing the cell contents into a new
//div that will never ever ever change colors until page reload.
function markSelection(){
	var redCell = document.createElement("div");
	redCell.style.backgroundColor = "red";
	redCell.textContent = currentSelection.textContent;
	currentSelection.textContent = "";
	currentSelection.appendChild(redCell);
}


//move the cursor over to the right. Marking the right cell with yellow background
//and a border. The previously selected cell is cleaned up.
function moveSelectionRight(){
		if (currentSelection.nextSibling != null){
			currentSelection.style.backgroundColor = "white";
			currentSelection.style.border = "";
			currentSelection = currentSelection.nextSibling;
			currentSelection.style.backgroundColor = "yellow";
			currentSelection.style.border = "solid";
		}	
}

//move the cursor over to the left. Marking the left cell with yellow background
//and a border. The previously selected cell is cleaned up.
function moveSelectionLeft(){
		if (currentSelection.previousSibling != null){
			currentSelection.style.backgroundColor = "white";
			currentSelection.style.border = "";
			currentSelection = currentSelection.previousSibling;
			currentSelection.style.backgroundColor = "yellow";
			currentSelection.style.border = "solid";
		}	
}

//move the cursor over to the down. Marking the cell below with yellow background
//and a border. The previously selected cell is cleaned up.
function moveSelectionDown(){
		if (currentSelection.parentNode.nextSibling != null){
			//save how many cells in we are
			var inPlaces = 0;
			
			//move out
			while(currentSelection.previousSibling != null){
				moveSelectionLeft();
				inPlaces++;
			}
			
			//move down one row
			currentSelection.style.backgroundColor = "white";
			currentSelection.style.border = "";
			currentSelection = currentSelection.parentNode.nextSibling.firstChild;
			currentSelection.style.backgroundColor = "yellow";
			currentSelection.style.border = "solid";
			
			//move back in
			for(var i = 0; i < inPlaces; i++){
				moveSelectionRight();
			}
		}	
}

//move the cursor up. Marking the cell above with yellow background
//and a border. The previously selected cell is cleaned up.
function moveSelectionUp(){
		if (currentSelection.parentNode.previousSibling != null
			&& currentSelection.parentNode.previousSibling.firstChild.tagName != "TH"){
			//save how many cells in we are
			var inPlacesUp = 0;
			
			//move out
			while(currentSelection.previousSibling != null){
				moveSelectionLeft();
				inPlacesUp++;
			}
			
			//move up one row
			currentSelection.style.backgroundColor = "white";
			currentSelection.style.border = "";
			currentSelection = currentSelection.parentNode.previousSibling.firstChild;
			currentSelection.style.backgroundColor = "yellow";
			currentSelection.style.border = "solid";
			
			//move back in
			for(var i = 0; i < inPlacesUp; i++){
				moveSelectionRight();
				
			}
		
		}

}		




