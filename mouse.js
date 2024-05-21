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

// 創建幾何體和材質，添加到場景
const Boxgeometry = new THREE.BoxGeometry();
const Boxmaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});
const cube = new THREE.Mesh(Boxgeometry, Boxmaterial);
scene.add(cube);
camera.position.set(5, 5, 5);

// orbit
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true; // 阻尼效果
orbit.dampingFactor = 0.01; // 阻尼值，介於0到1之間，數值越大阻力越大，越快變慢
// create rayCasting
const rayCaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// mouse click event
function onMouseClick(event){
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 更新射線與相機和滑鼠位置
    rayCaster.setFromCamera(mouse, camera);
    
    // 計算物體與射線的交點
    const intersects = rayCaster.intersectObjects([cube]);

    // 檢查是否有交點
    if(intersects.length > 0){
        const selectedObject = intersects[0].object;
        const currentColor = selectedObject.material.color.getHex();

        if(currentColor === 0xff0000){
            selectedObject.material.color.set(0x00ff00);
        } else {
            selectedObject.material.color.set(0xff0000);
        }
    } 
}

window.addEventListener('click', onMouseClick);
// end

// animation loop
function animate(){
    requestAnimationFrame(animate);
    orbit.update();
    renderer.render(scene, camera);
}

animate();