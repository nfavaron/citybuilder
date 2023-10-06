import { RemoveFromRendererObserver } from './remove-from-renderer.observer';
import { ApplicationConfigFactory } from '../../application.config.factory';

let observer: RemoveFromRendererObserver;

export function RemoveFromRendererObserverFactory(): RemoveFromRendererObserver {

  return observer || (observer = new RemoveFromRendererObserver(
    ApplicationConfigFactory().strategy.rendering(),
  ));
}
