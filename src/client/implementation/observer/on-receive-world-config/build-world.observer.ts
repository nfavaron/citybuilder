import { ObserverInterface } from '../../../architecture/interface/observer.interface';
import { EventInterface } from '../../../architecture/interface/event.interface';
import { WorldConfigInterface } from '../../../architecture/interface/world-config.interface';
import { WorldService } from '../../../architecture/service/world.service';

export class BuildWorldObserver implements ObserverInterface<WorldConfigInterface> {

  /**
   * Constructor
   */
  constructor(
    private worldService: WorldService,
  ) {

  }

  /**
   * @inheritDoc
   */
  on(event: EventInterface<WorldConfigInterface>): void {

    // Destroy the old world :(
    this.worldService.destroy();

    // Build the world based on config
    this.worldService.build(event.payload);
  }
}
