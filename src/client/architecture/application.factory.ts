import { Application } from './application';
import { WorldServiceFactory } from './service/world.service.factory';
import { ApplicationConfigFactory } from '../implementation/application.config.factory';
import { DatabaseServiceFactory } from './service/database.service.factory';

let application: Application;

export function ApplicationFactory(): Application {

  if (!application) {

    const config = ApplicationConfigFactory();

    application = new Application(
      WorldServiceFactory(),
      config.strategy.ui(),
      config.strategy.rendering(),
      DatabaseServiceFactory(),
    );
  }

  return application;
}
