class SharedStateManager {
  private static instance: SharedStateManager;
  private listeners: ((message: any) => void)[] = [];

  private constructor() {}

  static getInstance() {
    if (!SharedStateManager.instance) {
      SharedStateManager.instance = new SharedStateManager();
    }
    return SharedStateManager.instance;
  }

  addListener(listener: (message: any) => void) {
    this.listeners.push(listener);
  }

  postMessage(message: any) {
    this.listeners.forEach((listener) => listener(message));
  }
}

export const sharedStateManager = SharedStateManager.getInstance();
