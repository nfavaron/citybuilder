import { DatabaseService } from './database.service';
import { ApplicationConfigFactory } from '../../implementation/application.config.factory';
import { EventServiceFactory } from './event.service.factory';

let service: DatabaseService;

export function DatabaseServiceFactory(): DatabaseService {

  return service || (service = new DatabaseService(
    ApplicationConfigFactory(),
    EventServiceFactory(),
  ));
}
