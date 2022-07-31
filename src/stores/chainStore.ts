import { useApi } from "@/composables/api";
import { Chain } from "@/interfaces/backend/models/Chain";
import { defineStore } from "pinia";

export const useChainStore = defineStore("chain", {
  state: () => ({
    chains: [] as Chain[],
    loading: false,
    error: null,
  }),
  actions: {
    async loadChains() {
      this.chains = [];
      this.loading = true;

      try {
        const { get } = useApi<Chain[]>("api/chains");
        const result = await get();
        this.chains = result;
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
