

function CreateTable() {
    var innertext = "";
	document.getElementById("rowError").innerHTML = "";
	document.getElementById("columnError").innerHTML = "";
    var rows = document.getElementById("row").value;
    var columns = document.getElementById("column").value;
	var properFields = true;
	if (rows < 0) {
		document.getElementById("rowError").innerHTML = "*Cannot be negative";
		properFields = false; 
	}
	if (columns < 0) {
		document.getElementById("columnError").innerHTML = "*Cannot be negative";
		properFields = false;
	}
	innertext += "<table id=\"formedTable\">"
    for (var i = 1; i <= rows; ++i)
    {
        innertext += "<tr>";
        for (var j = 1; j <= columns; ++j)
        {
            innertext += "<td>" + i + ", " + j + "</td>";
        }
        innertext += "</tr>";        
    }
	innertext += "</table>";
    document.getElementById("tableContainer").innerHTML = innertext;
}

document.getElementById("formTable").addEventListener("click", CreateTable, false);