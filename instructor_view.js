//Create websocket client on the server to send and listen to messages
var websocket = new WebSocket("ws://localhost:8003");

function parseCSV(str) {
    var arr = [];
    var quote = false;  // 'true' means we're inside a quoted field

    // Iterate over each character, keep track of current row and column (of the returned array)
    for (var row = 0, col = 0, c = 0; c < str.length; c++) {
        var cc = str[c], nc = str[c+1];        // Current character, next character
        arr[row] = arr[row] || [];             // Create a new row if necessary
        arr[row][col] = arr[row][col] || '';   // Create a new column (start with empty string) if necessary

        // If the current character is a quotation mark, and we're inside a
        // quoted field, and the next character is also a quotation mark,
        // add a quotation mark to the current column and skip the next character
        if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }

        // If it's just one quotation mark, begin/end quoted field
        if (cc == '"') { quote = !quote; continue; }

        // If it's a comma and we're not in a quoted field, move on to the next column
        if (cc == ',' && !quote) { ++col; continue; }

        // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
        // and move on to the next row and move to column 0 of that new row
        if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }

        // If it's a newline (LF or CR) and we're not in a quoted field,
        // move on to the next row and move to column 0 of that new row
        if (cc == '\n' && !quote) { ++row; col = 0; continue; }
        if (cc == '\r' && !quote) { ++row; col = 0; continue; }

        // Otherwise, append the current character to the current column
        arr[row][col] += cc;
    }
    return arr;
}




//event listener to the window object 
window.addEventListener("load", function() {

function addQuestionToTable(event_data) {
	
	//var tokens = parseCSV(event_data);
	//console.log(tokens);
	//try with JSON
	console.log(event_data);
	const obj = JSON.parse(event_data);
	console.log(obj.category);
	
	if (!obj.name) return;
	var table_name = '#'+obj.category.replaceAll(' ','-')+'-table';
	console.log(table_name);
	var table = document.querySelector(table_name);
	
	var tr = table.insertRow(-1);
	var td1 = tr.insertCell();
	var td2 = tr.insertCell();
	var td3 = tr.insertCell();
	td1.innerHTML = obj.name;
	td2.innerHTML = obj.question;
	td3.innerHTML = obj.description;
	
	if (table_name=='#Debug-table') {
		console.log('debug table add');
		var td4 = tr.insertCell();
		var rb = document.createElement('button');
		rb.innerHTML = "Go To Room";
		td4.appendChild(rb);
	}

	
	
	// var tbody = table.createTBody();
	// table.appendChild(tbody);
	// var tbody = document.createElement('tbody')
	// tbody.id = obj.name;
	// var tr = tbody.insertRow();
	// var td1 = tr.insertCell();
	// var td2 = tr.insertCell();
	// var td3 = tr.insertCell();
	// var n = document.createTextNode(obj.name);
	// td1.appendChild(n);
	// var q = document.createTextNode(obj.question);
	// td2.appendChild(q);
	// var d = document.createTextNode(obj.description);
	// td3.appendChild(d);
	// console.log(d);
	
	// for (let i in tokens) {
		// if (tokens[i].startsWith('{ category:')) {	
			// var category = tokens[i].substring(11);
			
		// } 
		// else if (tokens[i].startsWith('question:')) {
			// var question = tokens[i].substring(11)
		// }
	// }
	
}




//Callback on the websocket api
//for this websocket when it recieves a message from the ws server, here is what to do with it
websocket.onmessage = function(event) {
	console.log(event);
	var received_data = event.data;
	var testText = document.querySelector('#test-text');
	testText.textContent = received_data;
	
	addQuestionToTable(received_data);
	
};

});