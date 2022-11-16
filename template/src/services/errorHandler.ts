import {AxiosError} from 'axios';
import ToastService from './toastService';

class ErrorHandler {
  messages: any[];

  debounce: number;

  filteredMessages: string[];

  messagesFilter: string[];

  constructor() {
    this.messages = [];
    this.debounce = 15000;
    this.filteredMessages = [];
    this.messagesFilter = [];

    this.initIntervals();
  }

  purgeOldMessages = () => {
    this.messages = this.messages.filter(i => i.expiresIn > Date.now());
  };

  initIntervals = () => {
    setInterval(this.purgeOldMessages, this.debounce);
  };

  handleError = (errorMessage: string, forceShow: boolean = false) => {
    if (forceShow) {
      return ToastService.showMessage('error', errorMessage);
    }

    const shouldShow =
      !this.filteredMessages.includes(errorMessage) &&
      !this.messages.some(i => i.message === errorMessage) &&
      !this.messagesFilter.some(i => errorMessage.includes(i));

    if (!shouldShow) {
      return null;
    }

    this.messages.push({
      message: errorMessage,
      expiresIn: Date.now() + this.debounce,
    });

    return ToastService.showMessage('error', errorMessage);
  };
}

export const errorHandler = new ErrorHandler();

export interface ErrorResponseType {
  errorType: 'SINGLE' | 'MULTIPLE';
  errorReason?: string;
  errorReasons?: string[];
}

export default function errorHandling(
  error: AxiosError<ErrorResponseType>,
  forceShow: boolean = false,
) {
  let message = null;
  if (
    error?.response?.data?.errorType === 'SINGLE' &&
    error?.response?.data?.errorReason
  ) {
    message = error?.response?.data?.errorReason;
  } else if (
    error?.response?.data?.errorType === 'MULTIPLE' &&
    error?.response?.data?.errorReasons
  ) {
    message = error?.response?.data?.errorReasons[0];
  } else if (error?.message) {
    message = error?.message;
  }

  if (message) {
    errorHandler.handleError(message, forceShow);
  }
}
