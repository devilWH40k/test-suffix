export function createStore(initialState = {}, onChange = () => {}) {
  return new Proxy(initialState, {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, value) {
      target[prop] = value;
      onChange(prop, value);
      return true;
    }
  });
}
