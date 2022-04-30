
window.addEventListener("load", function() {


var body = document.body;
console.log('body '+body);
//body.className = "back-blue";
var hammertime = new Hammer(body);
hammertime.on('pan', function(ev) {
	console.log(ev);
});

hammertime.get('pinch').set({ enable: true });
hammertime.get('rotate').set({ enable: true });
hammertime.get('rotate').set({ threshold: 90 });

//When a user makes a “pinch” gesture, set the background color of the page to blue
hammertime.on("pinch", function(event) {
	console.log("user pinched");
	body.className = "back-blue";

});

//When a user makes a “rotate” gesture, set the background color of the page to yellow
//hammertime.on("rotate", function(event) {
	//console.log("user rotated");
	//body.className = "back-yellow";
//});

//When a user makes a “swipe” gesture, set the background color of the page to purple
hammertime.on("swipe", function(event) {
	console.log("user swipe");
	body.className = "back-purple";

});

});