import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

// Create initial scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a sphere (planet)
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x0077ff });
const planet = new THREE.Mesh(geometry, material);
scene.add(planet);
camera.position.z = 5;

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Raycaster and mouse vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Variables for animation
let targetPosition = null;
let isMoving = false;
let zoomedIn = false;
const zoomDistance = 2; // The distance to zoom in

// Function to detect click
function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects([planet]);

  if (intersects.length > 0) {
    if (!zoomedIn) {
      // Set the target position for zooming in
      targetPosition = new THREE.Vector3(intersects[0].point.x, intersects[0].point.y, zoomDistance);
      zoomedIn = true;
    } else {
      // Set the target position for zooming out
      targetPosition = new THREE.Vector3(camera.position.x, camera.position.y, 5);
      zoomedIn = false;
    }
    isMoving = true;
  }
}

window.addEventListener('click', onMouseClick);

// Function to create surface view
function showSurface() {
  // Clear the current scene
  while(scene.children.length > 0){ 
    scene.remove(scene.children[0]); 
  }

  // Create a new surface scene
  const loader = new GLTFLoader();
  loader.load('gltffile/marsurface.glb', function(gltf){
    const surface = gltf.scene;
    scene.add(surface);
  }, undefined, function(error){
    console.error(error);
  })
  camera.position.set(0, 10, 10);
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);

  // If moving, interpolate camera position
  if (isMoving && targetPosition) {
    camera.position.lerp(targetPosition, 0.05); // Smooth transition
    if (camera.position.distanceTo(targetPosition) < 0.1) {
      isMoving = false; // Stop moving if close enough to the target
      if (zoomedIn) {
        showSurface(); // Show the surface view when zoomed in
      }
    }
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();