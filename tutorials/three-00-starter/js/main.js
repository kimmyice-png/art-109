import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import {OrbitControls} from htt







const scene = new THREE.Scene();

const light = new THREE.DirectionalLight(0xfffffff, 7);
light.position.set(1, 1, 5);
scene.add(light);


const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.outerWidth, window.outerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();
// const controls = new OrbitControls(camera, renderer.domElement);




//3d object



loader.load( './threeD-objects/bob_the_disappoinment.glb', function ( gltf ) {
    const human = gltf.scene;
  scene.add( human );







}, undefined, function ( error ) {

  console.error( error );

} );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.z = -0.5;
camera.position.x = -10.5;
camera.rotation.y = 11;
camera.position.y = 0.5;


function animate() {

//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
  // human.rotation.x += 0.01


// scene.rotation.y +=0.01;



// scene.rotation.z +=0.01;

// scene.rotation.x +=0.01;


  renderer.render( scene, camera );

}
