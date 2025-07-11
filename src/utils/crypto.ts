const STORAGE_PREFIX = 'rideforyou::';

class CryptoStorage {
  private getKey(key: string): string {
    return `${STORAGE_PREFIX}${key}`;
  }

  get(key: string): string | null {
    try {
      const value = localStorage.getItem(this.getKey(key));
      return value;
    } catch (error) {
      console.error('Error getting from storage:', error);
      return null;
    }
  }

  set(key: string, value: string): void {
    try {
      localStorage.setItem(this.getKey(key), value);
    } catch (error) {
      console.error('Error setting to storage:', error);
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}

export const storage = new CryptoStorage();

// Legacy functions for compatibility
export const get = (key: string) => storage.get(key);
export const set = (key: string, value: string) => storage.set(key, value);
export const clear = () => storage.clear();
