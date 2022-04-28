import { useApi } from "@/composables/api";
import { defineStore } from "pinia";

export const useChainStore = defineStore("chain", {
  state: () => ({
    chains: [] as Array<Backend.Models.Chain>,
    loading: false,
  }),
  actions: {
    async loadChains() {
      if (this.chains.length !== 0) {
        return;
      }

      try {
        this.loading = true;
        const { get, error } =
          useApi<Array<Backend.Models.Chain>>("api/chains");

        const result = await get();
        this.loading = false;

        if (!error.value) {
          this.chains = result;
        } else {
          console.log(error);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
});
