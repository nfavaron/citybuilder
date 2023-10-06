import { ObserverInterface } from '../../../architecture/interface/observer.interface';
import { EventInterface } from '../../../architecture/interface/event.interface';
import { WorldEntityModel } from '../../../architecture/model/world-entity.model';
import { RenderingStrategyInterface } from '../../../architecture/interface/rendering-strategy.interface';

export class AddToRendererObserver implements ObserverInterface<WorldEntityModel> {

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
  on(event: EventInterface<WorldEntityModel>): void {

    this.renderingStrategy.add(event.payload);
  }
}
