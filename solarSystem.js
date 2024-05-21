// import all i want to use 
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as dat from 'dat.gui';
import TWEEN, { Tween } from '@tweenjs/tween.js';

// import the image(若無法引入到cube textureloader，請檢察照片長寬是否相同)
import earthImg from './planetImg/earth.jpg';
import door from './img/door.jpg';
import sky from './img/starshdr.jpg';
import moonImg from './planetImg/moon.jpg';
import sunImg from './planetImg/sun.jpg';
import venusImg from './planetImg/venus.jpg';
import mercuryImg from './planetImg/mercury.jpg';
import marsImg from './planetImg/mars.jpg';
import jupiterImg from './planetImg/jupiter.jpg';
import saturnImg from './planetImg/saturn.jpg';
import saturnRingImg from './planetImg/saturnRring.png'

// background image
const nebulaPath = './img/nebula.jpg';
const starsPath = './img/stars.jpg';
const universePath = './img/starshdr.jpg'

// rock
import rock from './img/rock.jpg'


//---- declare the renderer ----//
const renderer = new THREE.WebGLRenderer();
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
    1000
)
// end

// set the orbit control
const orbit = new OrbitControls(camera, renderer.domElement);
// orbit.autoRotate = true;
// orbit.autoRotateSpeed = 5.0;
// end

// create the axes helper to set the 3d model
const axesHelper = new THREE.AxesHelper(100); // x, y, z坐標軸
scene.add(axesHelper); // add to the scene
// end

camera.position.set(120, 60, 120);
// orbit.update();


//---- add the point Light ----//
const light = new THREE.PointLight(0xFFFFFF);
// light.position.set( 50, 50, 50 );
scene.add( light );
const sLightHelper = new THREE.PointLightHelper(light);
scene.add(sLightHelper);
// end

// add the universe background with cube Texture
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    sky,
    sky,
    sky,
    sky,
    sky,
    sky
]);

// add the fog
scene.fog = new THREE.Fog(0xffffff, 0, 3000);

// create the textureLoader //
const textureLoader = new THREE.TextureLoader();

//---- create the planet ----//
// sun
const sunGeo = new THREE.SphereGeometry(40, 64, 50);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunImg)
});

const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);
sun.castShadow = true;
// end of create sun

// mercury
const mercuryGeo = new THREE.SphereGeometry(6.4, 64, 32)
const mercuryMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(mercuryImg)
});

const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
const mercuryObj = new THREE.Object3D();
scene.add(mercuryObj);
mercuryObj.add(mercury);
mercury.position.x = -84;



// venus
const venusGeo = new THREE.SphereGeometry(11.6, 64, 32);
const venusMater = new THREE.MeshStandardMaterial({
    wireframe: false,
    map: textureLoader.load(venusImg)
});
const venus = new THREE.Mesh(venusGeo, venusMater);
// sun.add(venus);
const venusObj = new THREE.Object3D();
scene.add(venusObj);
venusObj.add(venus);
venus.position.x = -132;
// venus.position.x = -30;
// end of create venus


// earth
const earthGeo = new THREE.SphereGeometry(12, 64, 32);
const earthMater = new THREE.MeshStandardMaterial({
    wireframe: false,
    map: textureLoader.load(earthImg)
})
const earth = new THREE.Mesh(earthGeo, earthMater);
const earthObj = new THREE.Object3D();
scene.add(earthObj);
earthObj.add(earth);
earth.position.x = -204;
// end of create earth

// mars
const marsGeo = new THREE.SphereGeometry(8, 64, 32);
const marsMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(marsImg)
});
const mars = new THREE.Mesh(marsGeo, marsMat);
const marsObj = new THREE.Object3D();
scene.add(marsObj);
marsObj.add(mars);
mars.position.x = -258;

// jupiter
const jupiterGeo = new THREE.SphereGeometry(20, 64, 32);
const jupiterMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(jupiterImg)
});
const jupiter = new THREE.Mesh(jupiterGeo, jupiterMat);
const jupiterObj = new THREE.Object3D();
scene.add(jupiterObj);
marsObj.add(jupiter);
jupiter.position.x = -378;

// saturn
const saturnGeo = new THREE.SphereGeometry(16, 64, 32);
const saturnMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(saturnImg)
});
const saturn = new THREE.Mesh(saturnGeo, saturnMat);
const saturnObj = new THREE.Object3D();
scene.add(saturnObj);
saturnObj.add(saturn);
saturn.position.x = -478;

// saturn Ring
const saturnRingGeo = new THREE.RingGeometry(30, 20, 32);
const saturnRingMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(saturnRingImg),
    side: THREE.DoubleSide
});
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
saturnObj.add(saturnRing);
saturnRing.position.x = -478;
saturnRing.rotation.x = -0.5 * Math.PI;


// createplanet(moonImg, 1, -10, 10, 0);

//---- create the GUI ----//
const gui = new dat.GUI();
// setting the choosing blocks
const options = {
    wireframe: false,
    backgroundImage: {
        Nebula: nebulaPath,
        Stars: starsPath,
        Universe: universePath},
    speed: 0.0001,
    sunLight: 10000,
    Rockspeed: 5000
};

const meteoriteButton = {addMeteorite: function() { addMeteorite();}};
gui.add(meteoriteButton, 'addMeteorite').name('Add Meteorite');

function addMeteorite(){
    const X = Math.floor(Math.random() * 500);
    const Y = Math.floor(Math.random() * 500);
    const Z = Math.floor(Math.random() * 500);
    // 創建一個隕石
    const meteoriteGeo = new THREE.DodecahedronGeometry(10, 0);
    const meteoriteMat = new THREE.MeshBasicMaterial({
        map: textureLoader.load(rock)
        // color: 0xff0000
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
            // meteorite.scale.set(endPosition);
        // }).onComplete(function(){
        //     scene.remove(meteorite);
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
// setting rotated speed
gui.add(options, 'speed', 0, 0.1);
// end

// setting sun Light
gui.add(options, 'sunLight', 5000, 100000);

gui.add(options, 'Rockspeed', 30, 5000);

// 0.004
function animate(){
    // rotate speed
    const speed = options.speed;
    // updateMeteorites();
    TWEEN.update();

    sun.rotateY(speed);
    mercuryObj.rotateY(speed * 10);
    mercury.rotateY(speed);
    venusObj.rotateY(speed * 3.75);
    venus.rotateY(speed * 0.5);
    earthObj.rotateY(speed * 2.5)
    earth.rotateY(speed * 5);
    marsObj.rotateY(speed * 2);
    mars.rotateY(speed * 4.5);
    jupiterObj.rotateY(speed * 1.5);
    jupiter.rotateY(speed * 2);
    saturnObj.rotateY(speed * 1.5);


    // sun light
    light.intensity = options.sunLight;

    renderer.render(scene, camera);
    // requestAnimationFrame(animate);

    orbit.update();
}

renderer.setAnimationLoop(animate);


window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});