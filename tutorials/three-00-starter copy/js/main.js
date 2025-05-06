import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from '../loaders/OrbitControls.js';

let sceneContainer = document.querySelector("#scene-container");

let human, mixer;

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
    const clips = gltf.animations;
    // const clip = THREE.AnimationClip.findByName(clips, 'human');
    // const action = mixer.clipAction(clip);
    // action.play();
    clips.forEach(function(clip){

      const action = mixer.clipAction(clip);
      action.play();
    });




    undefined, function(error){
      console.error(error)
    }
    
   
  }
);
const ploader = new THREE.TextureLoader();
scene.background = ploader.load('./threeD-objects/mountains.jpg')



document.querySelector("body").addEventListener("mousedown", () => {

  console.log("mousedown")
})


camera.position.set(-30.5, 5.5, -20.5);
camera.rotation.y = 70;

const clock = new THREE.Clock();


function animate() {
  const delta = clock.getDelta();

  if (human) {
    mixer.update(delta);
  }

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
