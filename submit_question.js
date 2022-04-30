//Create websocket client on the server to send and listen to messages
//LATER TODO: Change the dropdown list so that it populates dynamically from a list/array

var websocket = new WebSocket("ws://localhost:8003");


//event listener to the window object 
window.addEventListener("load", function() {

	//When the SUBMIT button is clicked, it displays what was submitted and clears the values
	var submitButton = document.querySelector('#submit-button');
	var categoryInput = document.getElementById("categories");
	var nameInput = document.querySelector('#name-text-input'); 
	var questionInput = document.querySelector('#question-text-area'); 
	var descriptionInput = document.querySelector('#description-text-area'); 

	submitButton.addEventListener("click", function(event) {
		var data = '{ "category": "'+categoryInput.options[categoryInput.selectedIndex].text+'", "name": "'+nameInput.value+'", "question": "'+questionInput.value+'", "description": "'+descriptionInput.value+'"}';
		console.log('submit button clicked :',data);
		nameInput.value = ""
		questionInput.value = "";
		descriptionInput.value = "";
		
		websocket.send(data);
		var testText = document.querySelector('#test-text');
		testText.textContent = data;
	});  // end of submit button clicked listener
	
}); // end of window load listener
	

