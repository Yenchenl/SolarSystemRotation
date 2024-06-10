// ---import three.js library and gltf Loader library
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/addons/loaders/OBJLoader';
// ---end of import

// ---gltf or glb 3d model file import
const model_path = './gltffile/Shadow.obj';

// ---declare the gltf Loader
const loader = new OBJLoader();
// load a resource
loader.load(
	// resource URL
	model_path,
	// called when resource is loaded
	function ( object ) {
         // ---create the renderer, set the size and set the renderer output color space
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        // ---end of setting renderer

        // ---set the three.js scene and color. add the model into scene
        const scene = new THREE.Scene();

		scene.add( object );
        // ---set the direction light, it will make the plane visible
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(45, 45, 45);
        scene.add(directionalLight);
        // ---end of directional light

        // ---set the directionalLighthelper, it will make the light visible(can delete) 
        const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
        scene.add( helper );
        const axeshelper = new THREE.AxesHelper(100);
        scene.add(axeshelper);
        // ---end of directionallighthelper

        // ---create the camera and set the position
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
        camera.position.set(50, 50, 100);
        camera.lookAt(new THREE.Vector3());
        scene.add(camera);
        // ---end of setting camera

        // ---add the orbitcontrol to control the camera movement
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.update();
        // ---end of orbitcontrol


        // ---rendering continue, and renew the controller and renderer
        function animate() {
            // planeObj.rotateY(0.01);
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