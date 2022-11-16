import SimpleToast from 'react-native-simple-toast';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ToastTypes = 'error' | 'success' | 'danger' | 'info';
type ToastDurations = number;

class ToastService {
  showMessage(message: string, duration: ToastDurations = SimpleToast.SHORT) {
    SimpleToast.show(message, duration);
  }
}

export default new ToastService();
