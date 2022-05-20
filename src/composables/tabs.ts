import { Tab } from "@/interfaces/Tab";
import { ref, computed } from "vue";

export const useTabs = (input: Array<Tab>) => {
  const tabs = ref(input);

  const activeTab = computed((): Tab | undefined => {
    if (tabs.value) {
      return tabs?.value.find((item: Tab) => item.current === true);
    }
  });

  return { tabs, activeTab };
};
