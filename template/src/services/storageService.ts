import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  async getItem(key: string, defaultValue: any = null): Promise<any> {
    return JSON.parse(
      (await AsyncStorage.getItem(key)) || JSON.stringify(defaultValue),
    );
  }

  setItem(key: string, value: any): Promise<void> {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): Promise<void> {
    return AsyncStorage.removeItem(key);
  }
}

export default new StorageService();
