import { EventInterface } from './event.interface';

export interface ObserverInterface<Payload> {

  /**
   * Event observer callback
   */
  on(event: EventInterface<Payload>): void;

}
