import { UpdatableInterface } from '../interface/updatable.interface';
import { Coordinates3dInterface } from '../interface/coordinates-3d.interface';

export abstract class WorldEntityModel implements UpdatableInterface {

  /**
   * ID
   */
  id: string = '';

  /**
   * Position in the world
   */
  position: Coordinates3dInterface = {
    x: 0,
    y: 0,
    z: 0,
  };

  /**
   * @inheritDoc
   */
  update(time: number): void {

  }
}
