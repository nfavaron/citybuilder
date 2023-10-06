import { AddToRendererObserver } from './add-to-renderer.observer';
import { ApplicationConfigFactory } from '../../application.config.factory';

let observer: AddToRendererObserver;

export function AddToRendererObserverFactory(): AddToRendererObserver {

  return observer || (observer = new AddToRendererObserver(
    ApplicationConfigFactory().strategy.rendering(),
  ));
}
