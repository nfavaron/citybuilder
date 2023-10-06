import { ObserverInterface } from '../../../architecture/interface/observer.interface';
import { EventInterface } from '../../../architecture/interface/event.interface';
import { RenderingStrategyInterface } from '../../../architecture/interface/rendering-strategy.interface';
import { Size2dInterface } from '../../../architecture/interface/size-2d.interface';

export class ResizeViewportObserver implements ObserverInterface<Size2dInterface> {

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
  on(event: EventInterface<Size2dInterface>): void {

    this.renderingStrategy.resizeViewport(event.payload);
  }
}
