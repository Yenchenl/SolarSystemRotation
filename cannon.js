import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as CANNON from 'cannon-es';

// setting scene
const scene = new THREE.Scene();
// end

// setting the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// end

// setting camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 40, -60);
// end

// setting orbit control
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();
// end
// ---- create the ground ---- //
const groundGeo = new THREE.PlaneGeometry(40, 40);
const groundMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    wireframe: true
});
const groundMesh = new THREE.Mesh(groundGeo, groundMat);
scene.add(groundMesh);

// ---- create the cube ---- //
const Bgeometry = new THREE.BoxGeometry(2, 2, 2);
const Bmaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
})
const cube = new THREE.Mesh(Bgeometry, Bmaterial);
scene.add(cube);
// end 

// setting the cannon.js world
const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.81, 0)
});

const groundPhysMat = new CANNON.Material()

// setting the ground, and add it with world
const groundBody = new CANNON.Body({
    // shape: new CANNON.Plane(),
    // mass: 10
    shape: new CANNON.Box(new CANNON.Vec3(20, 20, 0.1)),
    type: CANNON.Body.STATIC,
    material: groundPhysMat
});
world.addBody(groundBody);
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
// end

// add the gravity cube in the world
const cubeBody = new CANNON.Body({
    mass: 1,
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
    position: new CANNON.Vec3(1, 20, 0)
})
world.addBody(cubeBody);
// end

cubeBody.angularVelocity.set(20, 20, 0);

// create the sphere
const sphereGeo = new THREE.SphereGeometry(2);
const sphereMat = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
})

const sphere = new THREE.Mesh(sphereGeo, sphereMat);
scene.add(sphere);
// end

const spherePhyMat = new CANNON.Material();

// add the gravity sphere in the world
const sphereBody = new CANNON.Body({
    mass: 10,
    shape: new CANNON.Sphere(3),
    position: new CANNON.Vec3(0, 15, 0),
    material: spherePhyMat
})
world.addBody(sphereBody);

sphereBody.linearDamping = 0.31;

const groundSphereContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    spherePhyMat,
    {restitution: 1.5}
)
world.addContactMaterial(groundSphereContactMat);

const timeStep = 1/60;


function animate(){
    world.step(timeStep);
    renderer.render(scene, camera);

    groundMesh.position.copy(groundBody.position);
    groundMesh.quaternion.copy(groundBody.quaternion);

    cube.position.copy(cubeBody.position);
    cube.quaternion.copy(cubeBody.quaternion);

    sphere.position.copy(sphereBody.position);
    sphere.quaternion.copy(sphereBody.quaternion);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / window.innerHeight);
});