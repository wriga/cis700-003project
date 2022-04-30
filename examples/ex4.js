const scene = new THREE.Scene();
// PerspectiveCamera
// First attribute is field of view (FOV). This is in degrees. Extent of the scence that is seen on display
// Second attribute is aspect ratio. Almost always want to use some variation of width/height.
// Third attribute is near clipping plane. Objects closer than near value will not be rendered.
// Fourth attribute is far clipping plane. Objects farther than far value will not be rendered.
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// Renderer - we are using the WebGLRenderer.
// Create the instance of the renderer
const renderer = new THREE.WebGLRenderer();
// Need to set the size of the at which it will render the app. 
// In our case, we will use the width and height of the browser window.
renderer.setSize( window.innerWidth, window.innerHeight );
// Add the renderer element to the HTML. This is a canvas element the renderer uses to display the scene to us.
document.body.appendChild( renderer.domElement );

// Add the Cube
// To create the cube, we need a box geometry. This object contains all the vertices and faces of the cube.
const geometry = new THREE.BoxGeometry();
// Also need a color or material for the cube. 
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// Need a mesh for the cube. The mesh is an object that takes a geometry and applies a material to it. We can insert this into our scene and move it around. 
const cube = new THREE.Mesh( geometry, material );
// Add the cube to our scene. By default, adds it to coordinates (0,0,0)
scene.add( cube );
// But, this would cause the cube and camera to be on top of each other. So move the camera a bit.
camera.position.z = 5;
// At this point, we have not actually rendered anything to the screen yet. Need another function for that.


//create a blue LineBasicMaterial
camera.position.set( 0, 0, 15 );
camera.lookAt( 0, 0, 0 );
const line_material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const line_geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( line_geometry, line_material );
scene.add( line );


// Add controls
const controls = new THREE.OrbitControls( camera, renderer.domElement );

// Render/animate loop
function animate() {
	// Creates a loop that causes the renderer to draw the scene every time the screen is refreshed (typical screen is 60 times/sec (fps)
	requestAnimationFrame( animate );
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();