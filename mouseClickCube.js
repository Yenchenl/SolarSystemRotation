import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let targetPosition = null;
let isMoving = false;
let zoomedIn = false;
const zoomDistance = 2; // 拉近距離設為2單位

function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects([cube]);

  if (intersects.length > 0) {
    const point = intersects[0].point;
    if (!zoomedIn) {
      // 設定拉近的目標位置
      targetPosition = new THREE.Vector3(point.x, point.y, zoomDistance);
      zoomedIn = true;
    } else {
      // 設定恢復的目標位置
      targetPosition = new THREE.Vector3(point.x, point.y, 5); // 原始 z 值
      zoomedIn = false;
    }
    isMoving = true;
  }
}

window.addEventListener('click', onMouseClick);

function animate() {
  requestAnimationFrame(animate);

  // 如果正在移動，逐步更新相機位置
  if (isMoving && targetPosition) {
    camera.position.lerp(targetPosition, 0.05); // 平滑過渡
    if (camera.position.distanceTo(targetPosition) < 0.01) {
      isMoving = false; // 如果相機足夠接近目標，停止移動
    }
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();
