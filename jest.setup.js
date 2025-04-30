jest.mock("expo-av", () => ({
  Audio: {
    setAudioModeAsync: jest.fn(),
  },
}));
