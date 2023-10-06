import { WorldService } from './world.service';
import { ObjectPoolServiceFactory } from './object-pool.service.factory';
import { WorldEntityModel } from '../model/world-entity.model';
import { EventServiceFactory } from './event.service.factory';

let service: WorldService;

export function WorldServiceFactory(): WorldService {

  return service || (service = new WorldService(
    ObjectPoolServiceFactory<WorldEntityModel>('WorldEntityModel'),
    EventServiceFactory(),
  ));
}
