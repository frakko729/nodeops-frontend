import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", {
  state: () => ({
    backendEndpoint: import.meta.env.VITE_BACKEND_ENDPOINT,
    isMobileNavigation: false,
  }),
  actions: {
    getImage(path: string) {
      return `${this.backendEndpoint}storage/${path}`;
    },
    openMobileNavigation() {
      this.isMobileNavigation = true;
    },
    closeMobileNavigation() {
      this.isMobileNavigation = false;
    },
    toggleMobileNavigation() {
      this.isMobileNavigation = !this.isMobileNavigation;
    },
  },
});
