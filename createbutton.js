// import three.js
import * as THREE from 'three';
import * as dat from 'dat.gui';
import GLTFLoader from 'three-gltf-loader';

// imput one image as the texture
const textureLoader = new THREE.TextureLoader();
const bricksTexture = textureLoader.load('img/Brick1.jpg');

// 設定一個scene場景(必須)
const scene = new THREE.Scene();

// create the renderer, it is the background. 
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);// set the render size in the website
renderer.setClearColor(0xeeeeee, 1.0) // 預設背景顏色
renderer.shadowMap.enabled = true // 陰影效果
document.body.appendChild( renderer.domElement );// append in the website

// 產生一個相機(必須，沒有視角的話沒辦法看, attribute(field of view(FOV), aspect ratio(長寬比，通常都使用window.innerWidth / window.innerHeight), near(), far))
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 10);
camera.lookAt(scene.position) // 相機焦點
camera.lookAt(0, 0, 0);

//---- sphere creating ----//
const SphereGeometry = new THREE.SphereGeometry(2);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
})
const sphere = new THREE.Mesh(SphereGeometry, sphereMaterial);
scene.add(sphere);

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

