// ---import three.js library and gltf Loader library
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
// ---end of import

// ---gltf or glb 3d model file import
const model_path = './gltffile/airbus_a350.glb';

// ---declare the gltf Loader
const loader = new GLTFLoader();

loader.load(model_path, function(gltf) {
    // ---create the renderer, set the size and set the renderer output color space
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // ---end of setting renderer

    // ---set the three.js scene and color. add the model into scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // ---Scale the loaded model down
    gltf.scene.scale.set(0.05, 0.05, 0.05); // Adjust the scaling factor as needed,(x, y, z長度都縮小0.1倍)
    // scene.add(gltf.scene);
    // ---end of setting scene

    const planeObj = new THREE.Object3D();
    scene.add(planeObj);
    planeObj.add(gltf.scene);
    gltf.scene.position.x = -189;

    // ---add the axeshelper
    scene.add(new THREE.AxesHelper(5));

    // ---set the direction light, it will make the plane visible
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(45, 45, 45);
    scene.add(directionalLight);
    // ---end of directional light

    // ---set the directionalLighthelper, it will make the light visible(can delete) 
    const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
    scene.add( helper );
    // ---end of directionallighthelper

    // ---create the camera and set the position
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(100, 100, 100);
    camera.lookAt(new THREE.Vector3());
    scene.add(camera);
    // ---end of setting camera

    // ---add the orbitcontrol to control the camera movement
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    // ---end of orbitcontrol


    // ---rendering continue, and renew the controller and renderer
    function animate() {
        planeObj.rotateY(0.01);
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    // ---end of renewing

    // ---add the domElement to html body
    document.body.appendChild(renderer.domElement);
    // animate 
    animate();
}, undefined, function(error) {
    // ---if not show the renderer, show error
    console.error(error);
});