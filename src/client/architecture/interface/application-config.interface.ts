import { UiStrategyInterface } from './ui-strategy.interface';
import { RenderingStrategyInterface } from './rendering-strategy.interface';
import { ObserverInterface } from './observer.interface';

export interface ApplicationConfigInterface {

  /**
   * Strategies to customize the application behavior
   */
  strategy: {
    ui: () => UiStrategyInterface,
    rendering: () => RenderingStrategyInterface,
  };

  /**
   * Event observers to add business logic
   */
  event: {
    [eventName: string]: Array<() => ObserverInterface<any>>;
  };

  /**
   * Firebase configuration
   */
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}
