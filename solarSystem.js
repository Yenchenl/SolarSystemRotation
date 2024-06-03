// import all i want to use 
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as dat from 'dat.gui';
import TWEEN, { Tween } from '@tweenjs/tween.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

// import the image(若無法引入到cube textureloader，請檢察照片長寬是否相同)
import earthImg from './planetImg/earth.jpg';
import sky from './img/starshdr.jpg';
import sunImg from './planetImg/sun.jpg';
import venusImg from './planetImg/venus.jpg';
import mercuryImg from './planetImg/mercury.jpg';
import marsImg from './planetImg/mars.jpg';
import jupiterImg from './planetImg/jupiter.jpg';
import saturnImg from './planetImg/saturn.jpg';
import saturnRingImg from './planetImg/saturnRring.png'
import rock from './img/rock.jpg';

// background image
const nebulaPath = './img/nebula.jpg';
const starsPath = './img/stars.jpg';
const universePath = './img/starshdr.jpg'

// planet landscape glb file path
const marsLandscapePath = './gltffile/marsurface.glb';

//---- progress-bar environment----//
// loading to texture
const manager = new THREE.LoadingManager();

// initialize the loading bar to enter main page
const progressBar = document.getElementById('progress-bar');

// calculate the loading progress value
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	progressBar.value = (itemsLoaded / itemsTotal) * 100;
};
// all things in progress-bar
const progressBarContainer = document.querySelector('.progress-bar-container');

// set invisible
manager.onLoad = function(){
    progressBarContainer.style.display = 'none';
}
//---- progress-bar environment ----//

//---- planet position and radius ----//
const planets = [];
const mercuryRadius = 2;
const mercuryPosition = 37;
const venusRadius = 3;
const venusPosition = 47;
const earthRadius = 3.5;
const earthPosition = 58;
const marsRadius = 2;
const marsPosition = 69;
const jupiterRadius = 9.5;
const jupiterPosition = 85;
const saturnRadius = 6;
const saturnPosition = 105;
const saturnRingouterRadius = 7.5;
const saturnRinginnerRadius = 10.5;

// camera move angle
var maxAngle = 180 * Math.PI / 180;
var angleIncrement = 9 * Math.PI / 180;
var startTime = Date.now();
var currentAngle = 0;



//---- declare the renderer ----//
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight); // set the renderer size
renderer.shadowMap.enabled = true; // set the shadow visible
document.body.appendChild(renderer.domElement); // upload the renderer into the website
//---- end declare ----//

//---- declare the scene ----//
const scene = new THREE.Scene();
//---- end

//---- declare the camera ----//
// use perspective camera(fov, )
const camera = new THREE.PerspectiveCamera(
    45, 
    window.innerWidth / window.innerHeight,
    0.1,
    4000
)
camera.position.set(180, 60, 180);
// end

// set the orbit control
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;
orbit.dampingFactor = 0.03;
// end

// create the axes helper to set the 3d model
const axesHelper = new THREE.AxesHelper(100); // x, y, z坐標軸
// end

//---- add the point Light ----//
const light = new THREE.PointLight(0xFFFFFF);
scene.add( light );
const sLightHelper = new THREE.PointLightHelper(light);
// end

// add the universe background with cube Texture
const cubeTextureLoader = new THREE.CubeTextureLoader(manager);
scene.background = cubeTextureLoader.load([
    sky,
    sky,
    sky,
    sky,
    sky,
    sky
]);


// function to create planet orbit path
function PlanetOrbitLine(planetPosition){
    const orbitRingeometry = new THREE.RingGeometry(planetPosition - 0.2, planetPosition + 0.2, 200
    ); 
    const orbitRingmaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff, // 藍色
        side: THREE.DoubleSide,
        opacity: 0.5
    });    
    const orbitRing = new THREE.Mesh( orbitRingeometry, orbitRingmaterial ); 
    scene.add( orbitRing );
    orbitRing.rotation.x = -0.5 * Math.PI;
    return orbitRing;
}

// create the textureLoader //
const textureLoader = new THREE.TextureLoader(manager);

//---- create the planet ----//
// sun
const sunGeo = new THREE.SphereGeometry(28, 64, 50);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunImg)
});

const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);
sun.castShadow = true;

// create planet function
function planetCreate(radius, surfaceImg, positionSet){
    const planetGeo = new THREE.SphereGeometry(radius, 64, 32);
    const planetMat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(surfaceImg)
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    scene.add(planet);
    planet.position.x = positionSet
    return planet;
}

// create mercury
const mercury = planetCreate(mercuryRadius, mercuryImg, -(mercuryPosition));
const mercuryObj = new THREE.Object3D();
scene.add(mercuryObj);
mercuryObj.add(mercury);
const orbitMercury = PlanetOrbitLine(mercuryPosition);

// create venus
const venus = planetCreate(venusRadius, venusImg, -(venusPosition));
const venusObj = new THREE.Object3D();
scene.add(venusObj);
venusObj.add(venus);
const orbitVenus = PlanetOrbitLine(venusPosition);


// create earth
const earth = planetCreate(earthRadius, earthImg, -(earthPosition));
const earthObj = new THREE.Object3D();
scene.add(earthObj);
earthObj.add(earth);
const orbitEarth = PlanetOrbitLine(earthPosition);


// create mars
const mars = planetCreate(marsRadius, marsImg, -(marsPosition));
const marsObj = new THREE.Object3D();
scene.add(marsObj);
marsObj.add(mars);
const orbitMars = PlanetOrbitLine(marsPosition);


// create jupiter
const jupiter = planetCreate(jupiterRadius, jupiterImg, -(jupiterPosition));
const jupiterObj = new THREE.Object3D();
scene.add(jupiterObj);
jupiterObj.add(jupiter);
const orbitJupiter = PlanetOrbitLine(jupiterPosition);

// create saturn
const saturn = planetCreate(saturnRadius, saturnImg, -(saturnPosition));
const saturnObj = new THREE.Object3D();
scene.add(saturnObj);
saturnObj.add(saturn);
const orbitSaturn = PlanetOrbitLine(saturnPosition);


// saturn Ring
const saturnRingGeo = new THREE.RingGeometry(saturnRingouterRadius, saturnRinginnerRadius, 32);
const saturnRingMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(saturnRingImg),
    side: THREE.DoubleSide
});
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
saturnObj.add(saturnRing);
saturnRing.position.x = -(saturnPosition);
saturnRing.rotation.x = -0.5 * Math.PI;

//---- planet landScape create ----//
// raycaster and mouse vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// variables for animation
let targetPosition = null;
let isMoving = false;
let zoomedIn = false;
const zoomDistance = 3;

// function to detect click
function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([mars]);
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

function showSurface() {
    while(scene.children.length > 0){
        scene.remove(scene.children[0]);
    }
    // Create a new surface scene
    const loader = new GLTFLoader();
    loader.load(marsLandscapePath, function(gltf){
        const surface = gltf.scene;
        scene.add(surface);
    }, undefined, function(error){
        console.error(error);
    })
    camera.position.set(0, 10, 10);
    orbit.update();
}

//---- planet landScape create end ----//

//---- create the GUI ----//
const gui = new dat.GUI();
// setting the choosing blocks
const options = {
    wireframe: false,
    backgroundImage: {
        Nebula: nebulaPath,
        Stars: starsPath,
        Universe: universePath},
    speed: 0.001,
    sunLight: 10000,
    Rockspeed: 5000,
    backgroundRotationSpeed: 0.0005,
    orbit: false
};

const meteoriteButton = {addMeteorite: function() { addMeteorite();}};
gui.add(meteoriteButton, 'addMeteorite').name('Add Meteorite');

function addMeteorite(){
    const X = Math.floor(Math.random() * 500);
    const Y = Math.floor(Math.random() * 500);
    const Z = Math.floor(Math.random() * 500);
    // 創建一個隕石
    const meteoriteGeo = new THREE.DodecahedronGeometry(10, 0);
    const meteoriteMat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(rock)
    });
    const meteorite = new THREE.Mesh(meteoriteGeo, meteoriteMat);
    // 將隕石放置在太陽的外部
    
    // 將隕石添加到場景中，並讓他從vector(50, 100, 100)移動至(0, 0, 0)
    scene.add(meteorite);
    var startPosition = new THREE.Vector3(X, Y, Z);
    var endPosition = new THREE.Vector3(0, 0, 0);
    var tween = new TWEEN.Tween(startPosition).to(endPosition, options.Rockspeed).onUpdate(
        function(){
            meteorite.position.copy(startPosition);
        }).start();

}

const backgroundControl = gui.add(options, 'backgroundImage', options.backgroundImage).name('Background');
backgroundControl.onChange(function(selectedTexture) {
    const backTextureLoader = new THREE.CubeTextureLoader();
    scene.background = backTextureLoader.load([selectedTexture, selectedTexture, selectedTexture,
    selectedTexture, selectedTexture, selectedTexture]);
});
// end
// setting the wireframe
gui.add(options, 'wireframe').onChange(function(e){
    sun.material.wireframe = e;
    mercury.material.wireframe = e;
    venus.material.wireframe = e;
    earth.material.wireframe = e;
    mars.material.wireframe = e;
    jupiter.material.wireframe = e;
    saturn.material.wireframe = e;
    saturnRing.material.wireframe = e;

})
// end of setting wireframe

// setting the orbit angle
gui.add(options, 'orbit').name('Move Camera');

// setting rotated speed
gui.add(options, 'speed', 0, 0.1);

// setting sun Light
gui.add(options, 'sunLight', 5000, 100000);

// setting the Meteorite moving speed
gui.add(options, 'Rockspeed', 30, 5000);

// setting the background(只有背景) rotation speed
gui.add(options, 'backgroundRotationSpeed', 0, 0.05);

// 0.004
function animate(){
    // rotate speed
    const speed = options.speed;

    // background rotation speed
    const backgroundRotationSp = options.backgroundRotationSpeed;
    // updateMeteorites
    TWEEN.update();

    // setting if check box of camera move
    if (options.orbit) {
        var elapsedTime = (Date.now() - startTime) / 1000;
        currentAngle = angleIncrement * elapsedTime;
        currentAngle = currentAngle % (2 * Math.PI);

        var effectiveAngle = maxAngle * Math.sin(currentAngle);
        camera.position.y = 10 * Math.sin(effectiveAngle);
        camera.position.z = 20 * Math.cos(effectiveAngle);
    }

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

    // rotation speed
    sun.rotateY(speed);
    mercuryObj.rotateY(speed * 6);
    mercury.rotateY(speed);
    venusObj.rotateY(speed * 5.5);
    venus.rotateY(speed * 0.5);
    earthObj.rotateY(speed * 4.5)
    earth.rotateY(speed * 5);
    marsObj.rotateY(speed * 3.7);
    mars.rotateY(speed * 4.5);
    jupiterObj.rotateY(speed * 2);
    jupiter.rotateY(speed * 2);
    saturnObj.rotateY(speed * 1.5);

    // scene.rotateY(0.01);
    scene.backgroundRotation.y += backgroundRotationSp;
    // make orbit smooth
    orbit.update();

    // sun light
    light.intensity = options.sunLight;

    renderer.render(scene, camera);

}

renderer.setAnimationLoop(animate);


window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('click', onMouseClick);