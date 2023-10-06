import { UpdatableInterface } from './updatable.interface';
import { WorldEntityModel } from '../model/world-entity.model';
import { Size2dInterface } from './size-2d.interface';
import { WorldConfigInterface } from './world-config.interface';

export interface RenderingStrategyInterface extends UpdatableInterface {

  /**
   * Add world entity to rendering
   */
  add(worldEntity: WorldEntityModel): void;

  /**
   * Remove world entity from rendering
   */
  remove(worldEntity: WorldEntityModel): void;

  /**
   * Initialize camera
   */
  initializeCamera(worldConfig: WorldConfigInterface): void;

  /**
   * Resize viewport to @width and @height
   */
  resizeViewport(size: Size2dInterface): void;

}
