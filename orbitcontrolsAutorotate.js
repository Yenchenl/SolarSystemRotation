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

// 設置自動旋轉和旋轉速度
controls.autoRotate = true;             // 啟用自動旋轉
controls.autoRotateSpeed = 2.0;         // 設定自動旋轉的速度

// 設置旋轉角度限制
controls.minAzimuthAngle = -Math.PI / 4; // 限制左旋至-45度
controls.maxAzimuthAngle = Math.PI / 4;  // 限制右旋至45度
controls.minPolarAngle = Math.PI / 6;    // 限制向下旋轉的最小角度
controls.maxPolarAngle = Math.PI / 2;    // 限制向上旋轉的最大角度

function animate() {
  requestAnimationFrame(animate);
  controls.update(); // 更新控制器，包括處理自動旋轉
  renderer.render(scene, camera);
}

animate();
