import { ApplicationConfig } from './application.config';

let config: ApplicationConfig;

export function ApplicationConfigFactory(): ApplicationConfig {

  return config || (config = new ApplicationConfig());
}
