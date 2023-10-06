import { InitializeCameraPositionObserver } from './initialize-camera-position.observer';
import { ApplicationConfigFactory } from '../../application.config.factory';

let observer: InitializeCameraPositionObserver;

export function InitializeCameraPositionObserverFactory(): InitializeCameraPositionObserver {

  return observer || (observer = new InitializeCameraPositionObserver(
    ApplicationConfigFactory().strategy.rendering(),
  ));
}
