import { ref } from "vue";

export const useToggle = (state = false) => {
  const isToggled = ref(state);
  const toggle = () => (isToggled.value = !isToggled.value);
  const open = () => (isToggled.value = true);
  const close = () => (isToggled.value = false);
  const set = (state: boolean) => (isToggled.value = state);

  return { isToggled, toggle, open, close, set };
};
