import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

// setting scene
const scene = new THREE.Scene();

// setting the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// setting camera
const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// create ambientLight
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// create directionalLight
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight);
directionalLight.position.set(0, 50, 0);

// create axesHelper
const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);

// 創建幾何體和材質，添加到場景
const Boxgeometry = new THREE.BoxGeometry();
const Boxmaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});
const cube = new THREE.Mesh(Boxgeometry, Boxmaterial);
// scene.add(cube);
camera.position.set(0, 6, 6);

// orbit
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true; // 阻尼效果
orbit.dampingFactor = 0.01; // 阻尼值，介於0到1之間，數值越大阻力越大，越快變慢
// create rayCasting
const rayCaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const intersectionPoint = new THREE.Vector3();
const planeNormal = new THREE.Vector3();
const plane = new THREE.Plane();


// mouse click event
window.addEventListener('mousemove', function(e){
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    planeNormal.copy(camera.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);

    // 更新射線與相機和滑鼠位置
    rayCaster.setFromCamera(mouse, camera);
    rayCaster.ray.intersectPlane(plane, intersectionPoint);
    // 計算物體與射線的交點
});
// end

window.addEventListener('click', function(e){
    const BGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const BMaterial = new THREE.MeshStandardMaterial({
        color: 0xffea00,
        metalness: 0,
        roughness: 0
    });
    const bbox = new THREE.Mesh(BGeometry, BMaterial);
    scene.add(bbox);
    bbox.position.copy(intersectionPoint);

})

// animation loop
function animate(){
    requestAnimationFrame(animate);
    orbit.update();
    renderer.render(scene, camera);
}


window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})
animate();