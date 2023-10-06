import { ThreejsRenderingStrategy } from './threejs-rendering.strategy';
import Stats from 'three/examples/jsm/libs/stats.module';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ThreejsRenderingConfigFactory } from './threejs-rendering.config.factory';
import { ObjectPoolServiceFactory } from '../../../architecture/service/object-pool.service.factory';
import { WorldEntityModel } from '../../../architecture/model/world-entity.model';

let strategy: ThreejsRenderingStrategy;

export function ThreejsRenderingStrategyFactory(): ThreejsRenderingStrategy {

  if (!!strategy) {

    return strategy;
  }

  // FPS counter
  const stats = Stats();
  document.body.appendChild(stats.dom);
  stats.dom.style.cssText = 'position:absolute;top:5%;right:0px;';

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

  // Renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  window.document.body.appendChild(renderer.domElement);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  strategy = new ThreejsRenderingStrategy(
    ThreejsRenderingConfigFactory(),
    ObjectPoolServiceFactory<WorldEntityModel>('WorldEntityModel'),
    ObjectPoolServiceFactory<THREE.Mesh>('THREE.Mesh'),
    scene,
    camera,
    renderer,
    controls,
  );

  return strategy;
}
