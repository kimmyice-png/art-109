import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from '../loaders/OrbitControls.js';

let sceneContainer = document.querySelector("#scene-container");

let human, mixer;

const scene = new THREE.Scene();

const light = new THREE.DirectionalLight(0xffffff, 7);
light.position.set(1, 1, 5);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
  75,
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
loader.load('./threeD-objects/bob_animation.glb', function (gltf) {
    human = gltf.scene;
    scene.add(human);

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


document.querySelector("body").addEventListener("mousedown", () => {

  console.log("mousedown")
})


camera.position.set(-10.5, 0.5, -0.5);
camera.rotation.y = 11;

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
