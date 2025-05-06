import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from '../loaders/OrbitControls.js';
import { AudioListener, AudioLoader } from 'three';

let sceneContainer = document.querySelector("#scene-container");

let human, mixer, cloud;










const scene = new THREE.Scene();

const light = new THREE.DirectionalLight(0xfff3c6, 7);
light.position.set(-30, 10, 0);
scene.add(light);






const camera = new THREE.PerspectiveCamera(
  100,
  sceneContainer.clientWidth / sceneContainer.clientHeight,
  0.1,
  1000
);
scene.add(camera);




camera.position.set(-30.5, 5.5, -20.5);
camera.rotation.y = 70;




const renderer = new THREE.WebGLRenderer();
renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
renderer.setAnimationLoop(animate);
sceneContainer.appendChild(renderer.domElement);

const loader = new GLTFLoader();
const controls = new OrbitControls(camera, renderer.domElement);

// Load 3D object
loader.load('./threeD-objects/river.glb', function (gltf) {
    human = gltf.scene;
    scene.add(human);
    human.rotation.y = 70;

    mixer = new THREE.AnimationMixer(human);
    console.log("land")
    const clips = gltf.animations;
    // const clip = THREE.AnimationClip.findByName(clips, 'human');
    // const action = mixer.clipAction(clip);
    // action.play();
    clips.forEach(function(clip){

      const action = mixer.clipAction(clip);
      action.play();
    });


loader.load('./threeD-objects/clouds.glb', function(gltf){
  cloud = gltf.scene;
  scene.add(cloud);
  cloud.rotation.y = 70
  console.log("clouds");

})


    undefined, function(error){
      console.error(error)
    }
    
   
  }
);
const ploader = new THREE.TextureLoader();
scene.background = ploader.load('./threeD-objects/mountains.jpg')



// document.querySelector("body").addEventListener("mousedown", () => {

//   console.log("mousedown")
// })




const clock = new THREE.Clock();

const listener = new THREE.AudioListener();
// camera.add(listener);
const sound = new THREE.Audio (listener)

const audioLoader = new THREE.AudioLoader();
// let sound;
audioLoader.load ('./threeD-objects/Avantasia.mp3', function ( buffer ) {
  // sound = new THREE.Audio(listener);
  sound.setBuffer(buffer);
  sound.setLoop(true);
 
})

function onDocumentClick(event) {
  if (sound.isPlaying) { // Make sure the sound is loaded before playing
      sound.pause();
      console.log("pause");
  } else {
    sound.play();
    console.log("play");
  }
}

// scene.addEventListener('mousedown', function() {
//   if(sound.isPlaying) { 
//     sound.pause();
//     console.log("pause")
//   } else {
//     sound.play();
//     console.log("play")
//   }
// });
window.addEventListener('click', onDocumentClick);

// const canvas = document.getElementById('threejs-canvas'); // Or your canvas id
// canvas.addEventListener('click', onDocumentClick);




//``````````orbit controls ```````````


controls.update();

function animate() {
  const delta = clock.getDelta();

  if (human) {
    mixer.update(delta);
  }
  requestAnimationFrame( animate);
  controls.update();
  renderer.render(scene, camera);
}





// Optional: Make it responsive
window.addEventListener('resize', onWindowResize);

renderer.setAnimationLoop(animate);

function onWindowResize() {
  camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
}
