import { useApi } from "@/composables/api";
import { defineStore } from "pinia";
import { Node } from "@/interfaces/backend/models/Node";

export const useNodeStore = defineStore("node", {
  state: () => ({
    nodes: [] as Node[],
    loading: false,
    error: null,
  }),
  actions: {
    async loadNodes(filter?: object) {
      this.nodes = [];
      this.loading = true;

      try {
        const { get } = useApi<Node[]>("api/nodes");
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
