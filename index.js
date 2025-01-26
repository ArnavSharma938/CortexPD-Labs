import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/OutputPass.js';


const canvinfo = document.getElementById('myCanvas').getBoundingClientRect();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvinfo.width / canvinfo.height, 0.1, 100);

const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: myCanvas });
renderer.setSize(window.innerWidth, window.innerHeight);

let thing;

const loader = new GLTFLoader();
loader.load('static/out.glb', function (gltf) {
  const model = gltf.scene;
  thing = model;
  scene.add(model);
}, undefined, function (error) {
  console.error(error);
});

let scrollPercent = ((document.documentElement.scrollTop || document.body.scrollTop) /
  ((document.documentElement.scrollHeight || document.body.scrollHeight) -
    document.documentElement.clientHeight));

camera.position.z = 1.6 * (1 - scrollPercent);
camera.position.y += 0.15;

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const ubloomPass = new UnrealBloomPass(
  new THREE.Vector2(canvinfo.width, canvinfo.height),
  0.3,
  0.2,
  0.1
);
composer.addPass(ubloomPass);

const outputPass = new OutputPass();
composer.addPass(outputPass);

let newValue;

document.body.onscroll = () => {
  scrollPercent =
    ((document.documentElement.scrollTop || document.body.scrollTop) /
      ((document.documentElement.scrollHeight || document.body.scrollHeight) -
        document.documentElement.clientHeight));
  camera.position.z = 1.6 * (1 - scrollPercent);
  newValue = window.pageYOffset;
};

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function render() {
  composer.render();
}

function links() {
  let l = document.getElementById("navlinks");
  var children = l.children;
  if (window.getComputedStyle(l).display === "none") {
    l.style.display = "flex";
    for (var i = 0; i < children.length; i++) {
      var tableChild = children[i];
      tableChild.classList.toggle("fadeIn");
    }
  } else {
    for (var i = 0; i < children.length; i++) {
      var tableChild = children[i];
      tableChild.classList.toggle("fadeIn");
    }
  }
}
let listen = document.getElementById("brain");
listen.addEventListener("click", links);

function handleIntersection(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      for (var i = 0; i < target.children.length; i++) {
        target.children[i].classList.add('slideIn');
      }
    } else {
      for (var i = 0; i < target.children.length; i++) {
        target.children[i].classList.remove('slideIn');
      }
    }
  });
}

let observer = new IntersectionObserver(handleIntersection);
let target = document.getElementById("service-list");
observer.observe(target);

function animate() {
  requestAnimationFrame(animate);
  if (thing) { 
    thing.rotation.y += 0.0005;
  }
  composer.render();
}
animate();
