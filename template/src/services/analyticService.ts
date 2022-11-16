import Logger, {LogKeys} from './logger';

class AnalyticService {
  logScreenView(screenName?: string, screenParams?: {}) {
    Logger.log(LogKeys.Service, screenName, screenParams);
  }

  trackEvent(eventName: string, eventParams?: {}) {}
}

export default new AnalyticService();
