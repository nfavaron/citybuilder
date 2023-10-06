import { UpdatableInterface } from './updatable.interface';

export interface UiStrategyInterface extends UpdatableInterface {

  /**
   * Render UI
   */
  render(): void;
}
