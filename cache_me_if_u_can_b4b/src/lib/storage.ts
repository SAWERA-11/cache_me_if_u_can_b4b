import AsyncStorage from '@react-native-async-storage/async-storage';

export const kv = {
  async get<T>(key: string, defaultValue: T): Promise<T> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value === null ? defaultValue : JSON.parse(value) as T;
    } catch {
      return defaultValue;
    }
  },
  async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Persistence is optional; callers retain their in-memory state.
    }
  },
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch {
      // Persistence is optional; callers retain their in-memory state.
    }
  },
};
