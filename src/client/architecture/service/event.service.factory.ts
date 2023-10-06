import { EventService } from './event.service';
import { ApplicationConfigFactory } from '../../implementation/application.config.factory';

let service: EventService;

export function EventServiceFactory(): EventService {

  return service || (service = new EventService(
    ApplicationConfigFactory(),
  ));
}
