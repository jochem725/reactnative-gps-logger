jest.mock('Linking', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
  }
})

jest.mock('NetInfo', () => {
  return {
    isConnected: {
      fetch: () => {
        return new Promise((resolve, reject) => {
          resolve(true);
        })
      }
    }
  }
});

jest.mock('PushNotificationIOS', () => ({
  addEventListener: jest.fn(),
  requestPermissions: jest.fn(),
}));

jest.mock('react-native-fs', () => {
  return {
    writeFile: jest.fn(() => {
      return Promise.resolve()
    }),
    ExternalDirectoryPath: "PATH"
  }
});
