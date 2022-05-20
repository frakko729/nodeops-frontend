import { ComputedRef } from "vue";

export interface Tab {
  name: string;
  count?: ComputedRef | number | undefined;
  current: boolean;
}
