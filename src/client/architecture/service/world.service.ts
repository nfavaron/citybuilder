import { UpdatableInterface } from '../interface/updatable.interface';
import { WorldEntityModel } from '../model/world-entity.model';
import { WorldConfigInterface } from '../interface/world-config.interface';
import { ObjectPoolService } from './object-pool.service';
import { EventService } from './event.service';
import { FloorModel } from '../model/floor.model';

export class WorldService implements UpdatableInterface {

  /**
   * Constructor
   */
  constructor(
    private objectPoolService: ObjectPoolService<WorldEntityModel>,
    private eventService: EventService,
  ) {

  }

  /**
   * Build the world based on @worldConfig
   */
  build(worldConfig: WorldConfigInterface): void {

    worldConfig.city.forEach((row, x) => {

      row.forEach((tileConfig, z) => {

        // Create floor
        const floorModel = new FloorModel();
        floorModel.id = [x, z].join('#');
        floorModel.position = {
          x: x,
          y: 0,
          z: z,
        };
        floorModel.color = tileConfig.color;

        this.add(floorModel);
      });
    });

    // Event: build-world
    this.eventService.emit<WorldConfigInterface>({
      name: 'build-world',
      payload: worldConfig,
    });
  }

  /**
   * Destroy the world :(
   */
  destroy(): void {

    this
    .list()
    .forEach(entity => this.remove(entity));
  }

  /**
   * Add an entity to the world
   */
  add(entity: WorldEntityModel): void {

    // Add entity to object pool
    this.objectPoolService.add(entity.id, entity);

    // Event: add-world-entity
    this.eventService.emit<WorldEntityModel>({
      name: 'add-world-entity',
      payload: entity,
    });
  }

  /**
   * Remove an entity from the world
   */
  remove(entity: WorldEntityModel): void {

    // Remove entity from object pool
    this.objectPoolService.remove(entity.id);

    // Event: remove-world-entity
    this.eventService.emit<WorldEntityModel>({
      name: 'remove-world-entity',
      payload: entity,
    });
  }

  /**
   * Return a list of the world's entities
   */
  list(): WorldEntityModel[] {

    return this.objectPoolService.list();
  }

  /**
   * @inheritDoc
   */
  update(time: number): void {

    this
    .list()
    .forEach(entity => entity.update(time));
  }
}
