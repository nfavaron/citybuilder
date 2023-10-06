import { EventInterface } from '../interface/event.interface';
import { ApplicationConfigInterface } from '../interface/application-config.interface';

export class EventService {

  /**
   * Constructor
   */
  constructor(
    private applicationConfig: ApplicationConfigInterface,
  ) {

  }

  /**
   * Emit @event
   */
  emit<Payload>(event: EventInterface<Payload>): void {

    if (!this.applicationConfig.event[event.name]) {

      return;
    }

    this
      .applicationConfig
      .event[event.name]
    .forEach(observerFactory => observerFactory().on(event));
  }
}
