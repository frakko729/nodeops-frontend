import { computed, ref } from "vue";

/**
 * Helps with backend filters
 *
 * @param filter {object} Inital Filter Object
 * @returns
 */
export const useFilter = <T extends { [key: string]: any }>(filter: T) => {
  /**
   * Used for comparision and reset
   */
  const initalState: T = JSON.parse(JSON.stringify(filter));

  /**
   * Reactive Filter
   */
  const reactiveFilter = ref(filter);

  /**
   * Formats filter for using as api query parm
   */
  const parmFilter = computed((): object => {
    let parmFilter = {};

    Object.entries(reactiveFilter.value).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((entry: string | number, index: number) => {
          const newKey = `${key}[${index}]`;
          const filter = { [newKey]: entry };
          Object.assign(parmFilter, filter);
        });
      } else {
        Object.assign(parmFilter, {
          [key]: value,
        });
      }
    });

    return parmFilter;
  });

  /**
   * Check if filter has been used
   */
  const isFilterd = computed((): boolean => {
    let filtered = false;

    Object.entries(initalState).forEach(([key, value]) => {
      if (
        JSON.stringify(reactiveFilter.value[key as keyof T]) !=
        JSON.stringify(initalState[key])
      ) {
        filtered = true;
        return filtered;
      }
    });

    return filtered;
  });

  /**
   * Reset filter to inital state
   */
  const resetFilter = () => {
    Object.entries(initalState).forEach(([key, value]) => {
      reactiveFilter.value[key as keyof T] = JSON.parse(
        JSON.stringify(initalState[key])
      );
    });
  };

  return { reactiveFilter, parmFilter, isFilterd, resetFilter };
};
