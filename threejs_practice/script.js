$(document).ready(function(){
	//create a skybox- texture of field, texture of sky
	//create and import tree/flower models 
	//^^ do this tonight
	//make it so that the flowers sway (??)
	//create controls so that user will be able to navigate this space

	console.log('linked')

	window.addEventListener( 'resize', onWindowResize, false );  

	function onWindowResize() {
	    camera.aspect = window.innerWidth / window.innerHeight;
	    camera.updateProjectionMatrix();
	    renderer.setSize( window.innerWidth, window.innerHeight );
	}

	var scene = new THREE.Scene(); 
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
	
	var renderer = new THREE.WebGLRenderer(); 
	renderer.setSize( window.innerWidth, window.innerHeight ); 
	document.body.appendChild( renderer.domElement );;

	//Skybox

	var urls = [
        "images/mountain_bk.tga",  
        "images/mountain_dn.tga",    
        "images/mountain_ft.tga",    
        "images/mountain_lf.tga",   
        "images/mountain_rt.tga",    
        "images/mountain_up.tga"     
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
	var skybox = new THREE.Mesh( new THREE.BoxGeometry( 1000, 1000, 1000 ), material );
	scene.add( skybox );

	//models

	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3( -10,  10, 0 ),
		new THREE.Vector3( -10, -10, 0 ),
		new THREE.Vector3(  10, -10, 0 )
	);

	geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

	geometry.computeBoundingSphere();

	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	camera.position.z = 5;

	function render() {
	requestAnimationFrame( render );
	cube.rotation.y += 0.01;
	renderer.render( scene, camera );
	}
	render();
})

//perspective v. orthographic camera
//csg.js
//loader, 3-d modeling package
//model libraries
//blender