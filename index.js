import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/OutputPass.js";

const canvinfo = document.getElementById("myCanvas").getBoundingClientRect();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  canvinfo.width / canvinfo.height,
  0.1,
  100
);

const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: myCanvas });
renderer.setSize(window.innerWidth, window.innerHeight);

let thing;

const loader = new GLTFLoader();
loader.load(
  "public/static/out.glb",
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(1.3, 1.3, 1.3);
    thing = model;
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

camera.position.z = 1.6;
camera.position.y += 0.2;
camera.position.x -= 0.3;

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

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function render() {
  composer.render();
}

function animate() {
  requestAnimationFrame(animate);
  if (thing) {
    thing.rotation.y += 0.0005;
  }
  composer.render();
}
animate();

document.body.onscroll = () => {
  const scrollPercent =
    ((document.documentElement.scrollTop || document.body.scrollTop) /
      ((document.documentElement.scrollHeight || document.body.scrollHeight) -
        document.documentElement.clientHeight));

  const verticalRectangle = document.querySelector('.vertical-rectangle');
  const rightLineBackground = document.querySelector('.right-line-background');

  if (scrollPercent > 0) {
    verticalRectangle.style.backgroundColor = '#000';
    rightLineBackground.style.backgroundColor = '#111111';
  } else {
    verticalRectangle.style.backgroundColor = 'rgb(0, 0, 0)';
    rightLineBackground.style.backgroundColor = 'rgb(0, 0, 0)';
  }
};

const verticalRectangle = document.querySelector('.vertical-rectangle');
verticalRectangle.style.transition = 'background-color 0.5s ease-in-out';

const rightLineBackground = document.querySelector('.right-line-background');
rightLineBackground.style.transition = 'background-color 0.5s ease-in-out';
