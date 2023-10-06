import { ThreejsRenderingConfig } from './threejs-rendering.config';

let config: ThreejsRenderingConfig;

export function ThreejsRenderingConfigFactory(): ThreejsRenderingConfig {

  return config || (config = new ThreejsRenderingConfig());
}
