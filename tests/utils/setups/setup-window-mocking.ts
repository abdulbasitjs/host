export const setupWindowMocking = () => {
  window.matchMedia = jest.fn().mockImplementation((query: unknown) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));
  window.scroll = jest.fn();
  window.alert = jest.fn();
};
