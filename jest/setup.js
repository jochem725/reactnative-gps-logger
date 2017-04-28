jest.mock('react-native-fs', () => {
  return {
    writeFile: jest.fn(() => {
      return Promise.resolve()
    }),
    ExternalDirectoryPath: "PATH"
  }
});
