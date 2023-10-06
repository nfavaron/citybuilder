import { ApplicationConfigInterface } from '../architecture/interface/application-config.interface';
import { HtmlUiStrategyFactory } from './strategy/ui/html-ui.strategy.factory';
import { BuildWorldObserverFactory } from './observer/on-receive-world-config/build-world.observer.factory';
import { AddToRendererObserverFactory } from './observer/on-add-world-entity/add-to-renderer.observer.factory';
import {
  RemoveFromRendererObserverFactory
} from './observer/on-remove-world-entity/remove-from-renderer.observer.factory';
import { ThreejsRenderingStrategyFactory } from './strategy/rendering/threejs-rendering.strategy.factory';
import { ResizeViewportObserverFactory } from './observer/on-resize-window/resize-viewport.observer.factory';
import {
  InitializeCameraPositionObserverFactory
} from './observer/on-build-world/initialize-camera-position.observer.factory';

export class ApplicationConfig implements ApplicationConfigInterface {

  /**
   * @inheritDoc
   */
  strategy = {
    ui: HtmlUiStrategyFactory,
    rendering: ThreejsRenderingStrategyFactory,
  };

  /**
   * @inheritDoc
   */
  event = {
    'receive-world-config': [
      BuildWorldObserverFactory,
    ],
    'add-world-entity': [
      AddToRendererObserverFactory,
    ],
    'remove-world-entity': [
      RemoveFromRendererObserverFactory,
    ],
    'build-world': [
      InitializeCameraPositionObserverFactory,
    ],
    'resize-window': [
      ResizeViewportObserverFactory,
    ],
  };

  /**
   * Firebase configuration
   */
  firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
}
