<script setup lang="ts">
import { Chain } from "@/interfaces/backend/models/Chain";
import { NodeFilter } from "@/interfaces/backend/filters/NodeFilter";
import { useChainStore } from "@/stores/chainStore";
import { ref } from "vue";
import DropdownCheckboxFilter from "./inputs/DropdownCheckboxFilter.vue";

interface Props {
  modelValue: NodeFilter;
}

const { modelValue } = defineProps<Props>();

/**
 * Chain Options
 */
const chainOptions = ref<any>([]);

const chainStore = useChainStore();
chainStore.loadChains().then(() => {
  chainOptions.value = chainStore.chains.map((chain: Chain) => {
    return {
      label: chain.name,
      value: chain.id,
      checked: false,
    };
  });
});
</script>

<template>
  <DropdownCheckboxFilter
    origin="right"
    name="Chains"
    v-model="modelValue.chains"
    :options="chainOptions"
  />
</template>
