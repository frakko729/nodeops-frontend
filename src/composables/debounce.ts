import { ref, customRef } from "vue";

const debounce = (fn: any, delay = 0, immediate = false) => {
  let timeout: any;
  return (...args: any) => {
    if (immediate && !timeout) fn(...args);
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
const debouncedRef = (initialValue: any, delay: any, immediate: any) => {
  const state = ref(initialValue);
  const debouncedRef = customRef((track, trigger) => ({
    get() {
      track();
      return state.value;
    },
    set: debounce(
      (value: any) => {
        state.value = value;
        trigger();
      },
      delay,
      immediate
    ),
  }));
  return debouncedRef;
};

const debounceFunction = (fn: any, wait: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (event: Event) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (typeof fn === "function") {
        fn(event);
      }
    }, wait);
  };
};

export const useDebounce = () => {
  return { debouncedRef, debounceFunction };
};
