//Define Functions
function addInteractivityToContainer(codeEditorContainer, handle) {
	
		var isMouseDown = false;
	handle.addEventListener("mousedown", function(event) {
		console.log("1. user pressed mousedown");
		isMouseDown = true;
	});
	
	document.body.addEventListener("mousemove", function(event) {
		console.log("2. user moved the mouse");
		if (isMouseDown) {
			//console.log(event);
			var newX = event.x;
			var newY = event.y;
			
			codeEditorContainer.style.left = newX;
			codeEditorContainer.style.top = newY;
		}
	});
	
	document.body.addEventListener("mouseup", function(event) {
		console.log("3. user lifted the mouse");
		isMouseDown = false;
	});
	
	
}




//event listener to the window object 
window.addEventListener("load", function() {
	//setting styles in JS takes precedence over setting styles from CSS.
  document.body.style.backgroundColor = "lightblue";
  
  var paragraph2 = document.querySelector("p#second-paragraph");
  //seach for MDN HTMLElement API
  paragraph2.style.backgroundColor = "yellow"
  
  console.log("Hello from the JavaScript console!");
  console.log(paragraph2);
  
  // add an element dynamically
  //this code creates a button element and then it appends (i.e. adds it)
  //to the <body> ofthe document. Append = add to the end of the list of
  // child elements.
  var newButton = document.createElement("button");
  document.body.appendChild(newButton);
  
  //look for "code editor javascript component"
  //var myCodeMirror = CodeMirror(document.body)
  /**
  var myCodeMirror = CodeMirror(document.body, {
  value: "function myScript(){return 100;}\n",
  mode:  "javascript",
  viewportMargin: Infinity,
});
**/

	var myTextArea = document.querySelector('textarea#codemirror-text-area');
	//var myCodeMirror = CodeMirror.fromTextArea(myTextArea)
	
  var myCodeMirror = CodeMirror.fromTextArea(myTextArea, {
  //value: "function myScript(){return 100;}\n",
  mode:  "javascript",
  //viewportMargin: Infinity,
	});

	var handle = document.querySelector("#code-editor-handle");
	var codeEditorContainer = document.querySelector("#code-editor-container");

/* 	handle.addEventListener("click", function() {
		console.log("The handle was clicked.");
		//var codeEditorContainer = document.querySelector("#code-editor-container");
		codeEditorContainer.style.left ='150px';
		codeEditorContainer.style.top = '200px';
	}); */
	addInteractivityToContainer(codeEditorContainer, handle);


		//Add new CodeMirror to the html when the add-button is clicked
	var addButton = document.querySelector('#add-button'); 
	//var addButton = document.getElementById('add-button'); 
	addButton.addEventListener("click", function(event) {
		console.log('add button clicked');
		//var elementsToCreate = ["textarea", "div", "div"]

		//Create container for the CodeMirror
		//var codeEditorContainer
		var newDiv = document.createElement('div');
		newDiv.className = 'code-editor-container-class';
		newDiv.id = 'code-editor-container';
		
		//Text Area to put into the container - will become the CodeMirror
		var newTextArea = document.createElement("textarea");
		newTextArea.id = 'codemirror-text-area';

		//var handle
		var newDivHandle = document.createElement('div');
		newDivHandle.className = "code-editor-handle-class";
		newDivHandle.id = 'code-editor-handle';

		document.body.appendChild(newDiv);
		newDiv.appendChild(newDivHandle);
		newDiv.appendChild(newTextArea);
		
		//newDiv = codeEditorContainer
		//document.body.appendChild(newDiv);
		//newDiv.appendChild(handle);
		//newDiv.appendChild(myTextArea);		

		var newCodeMirror = CodeMirror.fromTextArea(newTextArea, {
		  //value: "function myScript(){return 100;}\n",
		  mode:  "javascript",
		  //viewportMargin: Infinity,
		});
		
		addInteractivityToContainer(newDiv, newDivHandle)
		
	});


	

	
	
	
	
	
	
	
	


	


console.log(myCodeMirror);

});