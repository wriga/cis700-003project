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

function addChatMessage(userColor, userMessage) {
	var newDiv = document.createElement('div');
	newDiv.className = 'chat-container-class';
	newDiv.id = 'chat-container';

	var newTextArea = document.createElement("textarea");
	newTextArea.id = 'chat-text-area';
	newTextArea.cols = 50
	newTextArea.value = userColor+ " : " + userMessage;
	newTextArea.style.color = userColor;
	//newTextArea.style.color = "magenta";
	newTextArea.readOnly = true;
	console.log("textarea color:"+userColor);

	//var newP = document.createElement("p");
	//newP.id = 'chat-paragraph';
	//newTextArea.cols = 50
	//new node = document.createTextNode(userColor+ " : " + userMessage);
	//newP.value = userColor+ " : " + userMessage;
	//newP.appendChild(node);

	//document.body.appendChild(newDiv);
	//newDiv.appendChild(newP);

	document.body.appendChild(newDiv);
	newDiv.appendChild(newTextArea);
}

var webPath = new Path();
color = Math.floor(Math.random()*16777215).toString(16);
webPath.strokeColor = '#'+color;

//Create websocket client on the server to send and listen to messages
var websocket = new WebSocket("ws://localhost:8003");
//Callback on the websocket api
//for this websocket when it recieves a message from the ws server, here is what to do with it
websocket.onmessage = function(event) {
	//var webPath = new Path();
	console.log(event);
	// If you manage to send the event as a string "<x> <y>"
	// You can then ...
	// How do you get the data sent this message.
	//var data = "130 120";
	var data = event.data;
	//var tokens = data.split(" ");
	var tokens = parseCSV(data);
	console.log(tokens, tokens[0][0]);
	if (tokens[0][0].startsWith('{ x:')) {	
		var xStr = tokens[0][0].substring(5);
		var yStr = tokens[0][1].substring(4,tokens[0][1].length-1);
		//var webColor = tokens[-1];
		console.log(webPath.strokeColor, parseFloat(tokens[0][2]));
		var x = parseInt(xStr);
		var y = parseInt(yStr);
		//Set color
		webPath.strokeColor.red = parseFloat(tokens[0][2].substring(7));
		webPath.strokeColor.green = parseFloat(tokens[0][3].substring(8));
		webPath.strokeColor.blue = parseFloat(tokens[0][4].substring(7, tokens[0][4].length-1));
		// How do you add this point to the path?
		console.log(x,y,webPath.strokeColor);
		webPath.add(new Point(x,y));
	} 
	else if (tokens[0][0].startsWith('{ msg:')) {
		console.log(tokens[0]);
		var userMessage = tokens[0][0].substring(6);
		var userColor = tokens[0][1].substring(8, tokens[0][1].length-1);
		console.log(userColor, userMessage);

		addChatMessage(userColor, userMessage);
	}
};



// Initialize the paper with a line
// Create a Paper.js Path to draw a line into it:
var path = new Path();
// Give the stroke a color
path.strokeColor = 'black';
var start = new Point(100, 100);
// Move to start and draw a line from there
path.moveTo(start);
// Note the plus operator on Point objects.
// PaperScript does that for us, and much more!
path.lineTo(start + [ 100, -50 ]);
	
//Click, Drag, Release tutorial	
var myPath = new Path();
var count = 0;
color = Math.floor(Math.random()*16777215).toString(16);
myPath.strokeColor = '#'+color;

function onMouseDown(event) {
	myPath = new Path();
	//var colors = ["black", "magenta", "cyan", "red"];
	//count = count + 1;
	//myPath.strokeColor = colors[count%3];
	myPath.strokeColor = '#'+color;
}

function onMouseDrag(event) {
	myPath.add(event.point);
	console.log("strokecolor is "+myPath.strokeColor);
	var data = [event.point, myPath.strokeColor].join(',');
	console.log("data is :" + data);
	websocket.send(data);
}

function onMouseUp(event) {
	var myCircle = new Path.Circle({
		center: event.point,
		radius: 10
	});
	myCircle.strokeColor = 'black';
	myCircle.fillColor = 'white';
}

var sendButton = document.querySelector('#send-button');
var chatTextInput = document.querySelector('#msg');  
sendButton.addEventListener("click", function(event) {
	var data = "{ msg: '"+chatTextInput.value+"', color: "+myPath.strokeColor.toCSS('hex')+"}";
	console.log('send button clicked :',data);
	websocket.send(data);
	addChatMessage(myPath.strokeColor.toCSS('hex'), chatTextInput.value);
	chatTextInput.value = '';
});