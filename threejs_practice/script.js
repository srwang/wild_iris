$(document).ready(function(){
console.log('main js linked')

var scene, camera, renderer, geometry, material, mesh, texture;


//	 SCALES CANVAS TO WINDOW SIZE
window.addEventListener( 'resize', onWindowResize, false );  

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
////////////////////////////////////////

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( -45, window.innerWidth / window.innerHeight, 0.1, 0 );

////////////////////////// CONTROLS
        controls = new THREE.OrbitControls(camera);
        controls.minDistance = 10;
        controls.maxDistance = 200;
        // controls.noKeys = true;
////////////////////////////////////////

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
//////////////////////////////////////////////////////

/////////////////// SKYBOX STUFF

var urls = [
        "images/box1.jpg",    // dark-s_px.jpg
        "images/box2.jpg",    // dark-s_nx.jpg
        "images/box3.jpg",    // dark-s_py.jpg
        "images/box4.jpg",    // dark-s_ny.jpg
        "images/box5.jpg",    // dark-s_pz.jpg
        "images/box6.jpg"     // dark-s_nz.jpg
    ];

    var textureCube = THREE.ImageUtils.loadTextureCube( urls );
    textureCube.format = THREE.RGBFormat;

    scene.matrixAutoUpdate = false;

    // Skybox
    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = textureCube;

    var material = new THREE.ShaderMaterial( {

        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        side: THREE.BackSide

    })
mesh = new THREE.Mesh( new THREE.BoxGeometry( 1000, 1000, 1000 ), material );
scene.add( mesh );

//////////////////////////////////////////////////////////

////////////////////////// SUN STUFF
var geometry = new THREE.SphereGeometry( 5,60, 60 );
// THE NEXT 2 LINES SET THE TEXTURE IMAGE ONTO THE OBJECT
var texture = THREE.ImageUtils.loadTexture('images/sun.jpg')
var material = new THREE.MeshBasicMaterial({map: texture, glow: true})
// var material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
// var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
var star = new THREE.Mesh( geometry, material );
star.position.set(0,0,0)
scene.add( star );
//////////////////////////////////////////////////////////

///////////////////////  PLANET ORBITING


// CREATE PARENTS FOR PLANETS
var marsparent = new THREE.Object3D();
var moonparent = new THREE.Object3D();
var earthparent = new THREE.Object3D();

scene.add( marsparent );
scene.add( moonparent );
scene.add( earthparent );

//Add second planet - creating the sphere
var smallGeometry = new THREE.SphereGeometry(3, 22, 22)
var smallTexture = THREE.ImageUtils.loadTexture('images/mars.jpg')
// var smallMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: true})
var smallMaterial = new THREE.MeshPhongMaterial({map: smallTexture})
var mars = new THREE.Mesh(smallGeometry, smallMaterial)
//mars.rotation.x += 45 * Math.PI / 180
mars.position.set( 0, 0, 10 )


//Add third planet - creating the sphere
var threeGeometry = new THREE.SphereGeometry(1, 22, 22)
var threeTexture = THREE.ImageUtils.loadTexture('images/moon.jpg')
// var threeMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, wireframe:true})
var threeMaterial = new THREE.MeshPhongMaterial({map: threeTexture})
var moon = new THREE.Mesh(threeGeometry, threeMaterial)
moon.position.set( 0, 0, 25 )


///////////////////////// EARTH STUFF

geometry = new THREE.SphereGeometry( 1, 60, 60 );
// THE NEXT 2 LINES SET THE TEXTURE IMAGE ONTO THE OBJECT
texture = THREE.ImageUtils.loadTexture('images/earth.jpg')
material = new THREE.MeshPhongMaterial({map: texture})

var earth = new THREE.Mesh( geometry, material );
earth.position.set( 0,0,20)

// scene.add( earth );
/////////////////////////////////////////////////////////////

//pivots
var marspivot = new THREE.Object3D();
var moonpivot = new THREE.Object3D();
var earthpivot = new THREE.Object3D();

marspivot.rotation.z = 1;
moonpivot.rotation.z = 5;
earthpivot.rotation.z = 10;

marsparent.add(marspivot)
moonparent.add(moonpivot)
earthparent.add(earthpivot)

marspivot.add( mars );
moonpivot.add( moon );
earthpivot.add( earth );



// LIGHTS
scene.add(new THREE.AmbientLight(0x444444, 0.0, 0));
var light = new THREE.PointLight( 0xffffff, 2, 10000 );
// light.position.set(20,20,20)
scene.add( light );

camera.position.z = 100;

// scene.add( new THREE.AxisHelper(20));

function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
	
	star.rotation.x += 0.001;
	star.rotation.y += 0.001;
	
	// mars.rotation.y *= 0.02;
	// mars.rotation.x += 0.02;
	
	// moon.rotation.x *= 0.07;
	// moon.rotation.y += 0.07;

	marsparent.rotation.x += 0.002;
	earthparent.rotation.y += .03;
	moonparent.rotation.x += 0.002;
}
render();
})

//perspective v. orthographic camera
//csg.js
//loader, 3-d modeling package
//model libraries
//blender