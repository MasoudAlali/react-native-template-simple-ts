import {ShowModalParams} from '@/components/ui/Modal';
import EventEmitter, {Events} from './eventEmitter';

class UiService {
  showModal(params: ShowModalParams) {
    EventEmitter.emit(Events.ShowModal, params);
  }

  hideModals() {
    EventEmitter.emit(Events.HideModal);
  }
}

export default new UiService();
