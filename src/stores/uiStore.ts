import { defineStore } from "pinia";

export const useUIStore = defineStore("ui", {
  state: () => ({
    isMobileNavigation: false,
  }),
  actions: {
    toggleMobileNavigation() {
      this.isMobileNavigation = !this.isMobileNavigation;
    },
  },
});
