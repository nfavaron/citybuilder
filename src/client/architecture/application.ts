import { UpdatableInterface } from './interface/updatable.interface';
import { WorldService } from './service/world.service';
import { UiStrategyInterface } from './interface/ui-strategy.interface';
import { RenderingStrategyInterface } from './interface/rendering-strategy.interface';
import { DatabaseService } from './service/database.service';

export class Application implements UpdatableInterface {

  /**
   * Start time in milliseconds
   */
  startTime: number = 0;

  /**
   * Constructor
   */
  constructor(
    private worldService: WorldService,
    private uiStrategy: UiStrategyInterface,
    private renderingStrategy: RenderingStrategyInterface,
    private databaseService: DatabaseService,
  ) {

  }

  /**
   * Start the application
   */
  start(): void {

    // Keep start time
    this.startTime = Date.now();

    // Render UI
    this.uiStrategy.render();

    // First update at time 0
    this.update(0);

    // Select world config from DB
    this.databaseService.selectWorldConfig();
  }

  /**
   * @inheritDoc
   */
  update(time: number): void {

    // Update world
    this.worldService.update(time);

    // Update UI
    this.uiStrategy.update(time);

    // Update the rendering
    this.renderingStrategy.update(time);

    // Request application update on every frame
    requestAnimationFrame(() => this.update(Date.now() - this.startTime));
  }
}
