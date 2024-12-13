const localStorage = {
  length: 0,
  key: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

window.localStorage = localStorage;

export { localStorage };
