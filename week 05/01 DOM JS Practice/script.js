// We create a new table element which we will later place into the DOM
var newTable = document.createElement("table");

// New row. Could have used nested loops if I had more rows.
var tableRow1 = document.createElement("tr");
var tableRow2 = document.createElement("tr");

// Creating the headers and data cells and appending them to rows
// that we just created
for(var i = 0; i < 3; i++){
	var newTableHeader = document.createElement("th");
	newTableHeader.textContent = "Header " + i + ".";
	tableRow1.appendChild(newTableHeader);
	
	var newTableData = document.createElement("td");
	newTableData.textContent = "Data " + i + ".";
	tableRow2.appendChild(newTableData);
}

// attaching rows to table
newTable.appendChild(tableRow1);
newTable.appendChild(tableRow2);

// attaching the table to our "tableWrapper" div 
document.getElementById("tableWrapper").appendChild(newTable);




