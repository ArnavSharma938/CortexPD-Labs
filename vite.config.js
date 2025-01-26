import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    resolve: {
      alias: {
        'three': path.resolve(__dirname, 'node_modules/three/build/three.module.js')
      }
    },
    optimizeDeps: {
      include: [
        'three/examples/jsm/loaders/GLTFLoader',
        'three/examples/jsm/postprocessing/EffectComposer',
        'three/examples/jsm/postprocessing/RenderPass',
        'three/examples/jsm/postprocessing/UnrealBloomPass',
        'three/examples/jsm/postprocessing/OutputPass'
      ]
    }
  });
  