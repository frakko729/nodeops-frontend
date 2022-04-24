import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isAuthenticated: true,
    address: "0x7d54a546cEF4751781aA206674a734dE6884726e",
    email: "user@example.com",
  }),
  getters: {
    shortAdress: (state) =>
      `${state.address.substring(0, 5)}...${state.address.substring(38, 42)}`,
  },
  actions: {
    login() {
      this.isAuthenticated = true;
    },
    logout() {
      this.isAuthenticated = false;
    },
  },
});
