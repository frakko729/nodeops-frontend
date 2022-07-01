import { ref } from "vue";

/**
 * FormKit helper
 *
 * @returns
 */
export const useForm = () => {
  const form = ref(); // template reference of the form

  const submitForm = () => {
    if (form.value) {
      const node = form.value.node;
      return node.submit();
    }
  };

  return { form, submitForm };
};
