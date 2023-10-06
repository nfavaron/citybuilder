import { HtmlUiStrategy } from './html-ui.strategy';
import { EventServiceFactory } from '../../../architecture/service/event.service.factory';

let strategy: HtmlUiStrategy;

export function HtmlUiStrategyFactory(): HtmlUiStrategy {

  return strategy || (strategy = new HtmlUiStrategy(
    window,
    EventServiceFactory(),
  ));
}
