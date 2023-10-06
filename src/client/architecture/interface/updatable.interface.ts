export interface UpdatableInterface {

  /**
   * Update the application at a given @time since the start
   *
   * @param time Number of milliseconds elapsed since the start
   */
  update(time: number): void;

}
