const mapping = {
  setItem: (key, value) => localStorage.setItem(key, value),
  getItem: (key) => localStorage.getItem(key),
  clear: () => localStorage.clear(),
};

const useLocalStorage = (fn) => mapping[fn];

export default useLocalStorage;
