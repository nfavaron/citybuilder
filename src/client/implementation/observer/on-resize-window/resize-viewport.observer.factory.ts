import { ResizeViewportObserver } from './resize-viewport.observer';
import { ApplicationConfigFactory } from '../../application.config.factory';


let observer: ResizeViewportObserver;

export function ResizeViewportObserverFactory(): ResizeViewportObserver {

  return observer || (observer = new ResizeViewportObserver(
    ApplicationConfigFactory().strategy.rendering(),
  ));
}
