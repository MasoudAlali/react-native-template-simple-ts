export enum LogKeys {
  API = 'API',
  Cache = 'CACHE',
  Component = 'COMPONENT',
  Hook = 'HOOK',
  Error = 'ERROR',
  Service = 'SERVICE',
  Other = 'OTHER',
}

class Logger {
  hiddenLogs: Partial<Record<LogKeys, boolean>> = {
    [LogKeys.API]: false,
    [LogKeys.Error]: true,
    [LogKeys.Other]: true,
    [LogKeys.Cache]: true,
    [LogKeys.Component]: true,
    [LogKeys.Hook]: true,
    [LogKeys.Service]: true,
  };

  private _console: typeof console;

  constructor() {
    this._console = console;
  }

  log(key: LogKeys, ...messages: any) {
    if (this.hiddenLogs[key]) {
      return;
    }

    this._console.log(key, ...messages);
  }

  warn(key: LogKeys, ...messages: any) {
    if (this.hiddenLogs[key]) {
      return;
    }

    this._console.warn(key, ...messages);
  }

  info(key: LogKeys, ...messages: any) {
    if (this.hiddenLogs[key]) {
      return;
    }

    this._console.info(key, ...messages);
  }

  error(key: LogKeys, ...messages: any) {
    if (this.hiddenLogs[key]) {
      return;
    }

    this._console.error(key, ...messages);
  }

  trace(key: LogKeys, ...messages: any) {
    if (this.hiddenLogs[key]) {
      return;
    }

    this._console.trace(key, ...messages);
  }

  debug(key: LogKeys, ...messages: any) {
    if (this.hiddenLogs[key]) {
      return;
    }

    this._console.debug(key, ...messages);
  }

  table(...data: any[]) {
    this._console.table(...data);
  }

  group(label?: string) {
    this._console.group(label);
  }

  enable(key?: LogKeys) {
    if (key) {
      this.hiddenLogs[key] = true;
    } else {
      this.hiddenLogs = {
        [LogKeys.API]: true,
        [LogKeys.Cache]: true,
        [LogKeys.Component]: true,
        [LogKeys.Error]: true,
        [LogKeys.Other]: true,
        [LogKeys.Hook]: true,
        [LogKeys.Service]: true,
      };
    }
  }

  disable(key?: LogKeys) {
    if (key) {
      this.hiddenLogs[key] = false;
    } else {
      this.hiddenLogs = {
        [LogKeys.API]: false,
        [LogKeys.Cache]: false,
        [LogKeys.Component]: false,
        [LogKeys.Error]: false,
        [LogKeys.Other]: false,
        [LogKeys.Hook]: false,
        [LogKeys.Service]: false,
      };
    }
  }
}

export default new Logger();
