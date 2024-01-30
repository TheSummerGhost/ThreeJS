import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const renderer = new THREE.WebGL1Renderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const axesHelper = new THREE.AxesHelper(5);

const orbit = new OrbitControls(camera, renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 4);

const boxGeometry = new THREE.BoxGeometry(10,10,10);
const boxMaterial = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    //shadowSide: THREE.Vector,
    transparent: true,
    opacity: 0.9});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(10, 10, 0);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;

const sphereGeometry = new THREE.SphereGeometry(3, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({color: 0xF56960, transparent: false, opacity: 0.5, wireframe: false});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 10, 0);
const gridHelper = new THREE.GridHelper(100, 20);

const gui = new dat.GUI();

const options = {
    sphereColor: 0x00ff00,

};

gui.addColor(options, 'sphereColor').onChange(function (value) {
    sphere.material.color.set(value);
});

camera.position.set(-10, 30, 30);
orbit.update();


function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;
    box.rotation.z = time / 1000;
    renderer.render(scene, camera);
}

scene.add(sphere);

scene.add(light);

scene.add(gridHelper);

scene.add(box);

scene.add(plane);

scene.add(axesHelper);

renderer.setAnimationLoop(animate);



