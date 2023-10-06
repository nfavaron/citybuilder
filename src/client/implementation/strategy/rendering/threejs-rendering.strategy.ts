import { RenderingStrategyInterface } from '../../../architecture/interface/rendering-strategy.interface';
import { WorldEntityModel } from '../../../architecture/model/world-entity.model';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Size2dInterface } from '../../../architecture/interface/size-2d.interface';
import { WorldConfigInterface } from '../../../architecture/interface/world-config.interface';
import { ObjectPoolService } from '../../../architecture/service/object-pool.service';
import { ThreejsRenderingConfig } from './threejs-rendering.config';
import { FloorModel } from '../../../architecture/model/floor.model';

export class ThreejsRenderingStrategy implements RenderingStrategyInterface {

  /**
   * Constructor
   */
  constructor(
    private threejsRenderingConfig: ThreejsRenderingConfig,
    private worldEntityObjectPoolService: ObjectPoolService<WorldEntityModel>,
    private meshObjectPoolService: ObjectPoolService<THREE.Mesh>,
    private scene: THREE.Scene,
    private camera: THREE.PerspectiveCamera,
    private renderer: THREE.WebGLRenderer,
    private controls: OrbitControls,
  ) {

  }

  /**
   * @inheritDoc
   */
  add(worldEntity: WorldEntityModel): void {

    let mesh;

    // TODO[nico] Implement builder per entity type
    switch (worldEntity.constructor.name) {

      case 'FloorModel':
        const geometry = new THREE.BoxGeometry(this.threejsRenderingConfig.size, 1, this.threejsRenderingConfig.size);
        const material = new THREE.MeshBasicMaterial({color: (worldEntity as FloorModel).color});
        mesh = new THREE.Mesh(geometry, material);
        break;
    }

    if (!mesh) {

      return;
    }

    // Add mesh to scene
    this.scene.add(mesh);

    // Add mesh to object pool
    this.meshObjectPoolService.add(worldEntity.id, mesh);
  }

  /**
   * @inheritDoc
   */
  remove(worldEntity: WorldEntityModel): void {

    const mesh = this.meshObjectPoolService.get(worldEntity.id);

    if (!mesh) {

      return;
    }

    // Remove from scene
    this.scene.remove(mesh);

    // Remove entity from object pool
    this.meshObjectPoolService.remove(worldEntity.id);
  }

  /**
   * @inheritDoc
   */
  initializeCamera(worldConfig: WorldConfigInterface): void {

    // Position camera on top of city
    this.camera.position.x = -2 * this.threejsRenderingConfig.size;
    this.camera.position.y = 4 * this.threejsRenderingConfig.size;
    this.camera.position.z = -2 * this.threejsRenderingConfig.size;

    // Make camera look at the center of the city
    const vector = new THREE.Vector3(
      Math.round(worldConfig.city[0].length / 2.0 * this.threejsRenderingConfig.size),
      0,
      Math.round(Object.keys(worldConfig.city).length / 2.0 * this.threejsRenderingConfig.size),
    );
    this.camera.lookAt(vector);
    this.controls.target = vector;
  }

  /**
   * @inheritDoc
   */
  resizeViewport(size: Size2dInterface): void {

    this.camera.aspect = size.width / size.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(size.width, size.height);
  }

  /**
   * @inheritDoc
   */
  update(time: number): void {

    // For each world entity
    this
    .worldEntityObjectPoolService
    .list()
    .forEach(worldEntity => {

      const mesh = this.meshObjectPoolService.get(worldEntity.id);

      if (!mesh) {

        return;
      }

      mesh.position.x = worldEntity.position.x * (this.threejsRenderingConfig.size + this.threejsRenderingConfig.margin);
      mesh.position.z = worldEntity.position.z * (this.threejsRenderingConfig.size + this.threejsRenderingConfig.margin);

      mesh.scale.y = this.threejsRenderingConfig.height;
    });

    // Update renderer
    this.renderer.render(this.scene, this.camera);
  }
}
