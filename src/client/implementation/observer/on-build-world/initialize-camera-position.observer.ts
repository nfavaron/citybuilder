import { ObserverInterface } from '../../../architecture/interface/observer.interface';
import { EventInterface } from '../../../architecture/interface/event.interface';
import { WorldConfigInterface } from '../../../architecture/interface/world-config.interface';
import { RenderingStrategyInterface } from '../../../architecture/interface/rendering-strategy.interface';

export class InitializeCameraPositionObserver implements ObserverInterface<WorldConfigInterface> {

  /**
   * Constructor
   */
  constructor(
    private renderingStrategy: RenderingStrategyInterface,
  ) {

  }

  /**
   * @inheritDoc
   */
  on(event: EventInterface<WorldConfigInterface>): void {

    this.renderingStrategy.initializeCamera(event.payload);
  }
}
