import { BuildWorldObserver } from './build-world.observer';
import { WorldServiceFactory } from '../../../architecture/service/world.service.factory';

let observer: BuildWorldObserver;

export function BuildWorldObserverFactory(): BuildWorldObserver {

  return observer || (observer = new BuildWorldObserver(
    WorldServiceFactory(),
  ));
}
