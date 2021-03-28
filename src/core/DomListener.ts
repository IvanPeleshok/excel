import { Dom } from './dom';
import { capitalize } from './utils';

export class DomListener {
  name: string;

  constructor(public $root: Dom, public listeners: string[] = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener: any) => {
      const method = this.getMethodName(listener);
      if (!this[method]) {
        const name = this.name || '';
        throw new Error(
            `Method ${method} is not implemented in ${name} Component`
        );
      }
      this[method] = this[method].bind(this);
      // Тоже самое что и addEventListener
      this.$root.on(listener, this[method]);
    })
  }

  removeDOMListeners() {
    this.listeners.forEach((listener: any) => {
      const method = this.getMethodName(listener)
      this.$root.off(listener, this[method]);
    })
  }

  // input => onInput
  private getMethodName(eventName: any) {
    return 'on' + capitalize(eventName);
  }
}



