import {isDev} from '@/constants';
import Logger from '@/services/logger';

class DebuggerService {
  init() {
    if (!isDev) {
      return Logger.disable();
    }
  }
}

export default new DebuggerService();
