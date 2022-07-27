import { useApi } from "@/composables/api";
import { defineStore } from "pinia";

export const useNodeStore = defineStore("node", {
  state: () => ({
    nodes: [] as Backend.Models.Node[],
    loading: false,
    error: null,
  }),
  actions: {
    async loadNodes(filter?: object) {
      this.nodes = [];
      this.loading = true;

      try {
        const { get } = useApi<Backend.Models.Node[]>("api/nodes");
        const result = await get(filter || {});
        this.nodes = result;
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
