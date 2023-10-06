import { EventService } from '../../../architecture/service/event.service';
import { UiStrategyInterface } from '../../../architecture/interface/ui-strategy.interface';
import { WorldConfigInterface } from '../../../architecture/interface/world-config.interface';

export class HtmlUiStrategy implements UiStrategyInterface {

  /**
   * DOM elements
   */
  private configLoaderDom: HTMLElement;
  private configLoaderButtonDom: HTMLElement;
  private footerConfigButtonDom: HTMLElement;
  private configLoaderTextareaDom: HTMLTextAreaElement;

  /**
   * CSS classes
   */
  private configLoaderIsOpenClass: string = 'config-loader--is-open';

  /**
   * Constructor
   */
  constructor(
    private window: Window,
    private eventService: EventService,
  ) {

    // DOM elements
    this.configLoaderDom = this.window.document.getElementById('config-loader') as HTMLElement;
    this.configLoaderButtonDom = this.window.document.getElementById('config-loader-button') as HTMLElement;
    this.footerConfigButtonDom = this.window.document.getElementById('footer-config-button') as HTMLElement;
    this.configLoaderTextareaDom = this.window.document.getElementById('config-loader-textarea') as HTMLTextAreaElement;
  }

  /**
   * Render the UI
   */
  render(): void {

    // On click footer config button
    this.footerConfigButtonDom.addEventListener('click', event => {

      // Open config loader
      this.configLoaderDom.classList.add(this.configLoaderIsOpenClass);
    });

    // On click submit button
    this.configLoaderButtonDom.addEventListener('click', event => {

      // Close config loader
      this.configLoaderDom.classList.remove(this.configLoaderIsOpenClass);

      // Receive config
      this.receiveConfig();
    });

    // Window events
    this.window.addEventListener(
      'resize',
      event => this.eventService.emit<{ width: number; height: number; }>({
        name: 'resize-window',
        payload: {
          width: this.window.innerWidth,
          height: this.window.innerHeight,
        },
      }),
      false,
    );

    // Receive config
    this.receiveConfig();
  }

  /**
   * @inheritDoc
   */
  update(time: number): void {

    // Nothing yet
  }

  /**
   * Receive config from UI
   */
  private receiveConfig(): void {

    try {

      const worldConfig = JSON.parse(this.configLoaderTextareaDom.value) as WorldConfigInterface;

      this.eventService.emit<WorldConfigInterface>({
        name: 'receive-world-config',
        payload: worldConfig,
      });
    } catch (error) {

      alert(error);
    }
  }
}
