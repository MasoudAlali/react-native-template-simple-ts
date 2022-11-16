import {Observer, Subject, Subscription} from 'rxjs';
import {InteractionManager} from 'react-native';

export enum Events {
  ShowModal = 'general-show-modal',
  HideModal = 'general-hide-modal',
}

class EventEmitter {
  private readonly observables: Record<Events, Subject<any>>;

  constructor() {
    this.observables = {} as Record<Events, Subject<any>>;
  }

  addListener = (eventName: Events, handler: (value?: any) => void) => {
    let {[eventName]: observable} = this.observables;

    if (!observable) {
      observable = this.registerObservable(eventName);
    }

    return observable.subscribe({
      next: handler,
      complete: () => this.removeObservable(eventName),
    } as Observer<any>);
  };

  registerObservable = (eventName: Events) => {
    if (Object.hasOwnProperty.call(this.observables, eventName)) {
      return this.observables[eventName];
    }

    return (this.observables[eventName] = new Subject());
  };

  removeObservable = (eventName: Events) => {
    delete this.observables[eventName];
  };

  removeListener = (handler: Subscription) => {
    handler.unsubscribe();
  };

  emit = (eventName: Events, payload?: any) => {
    const {[eventName]: observable} = this.observables;

    if (!observable) {
      return;
    }

    InteractionManager.runAfterInteractions(() => {
      observable.next(payload);
    });
  };
}

export default new EventEmitter();
