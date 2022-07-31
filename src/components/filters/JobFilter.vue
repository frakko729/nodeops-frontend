<script setup lang="ts">
import { JobFilter } from "@/interfaces/backend/filters/JobFilter";
import { Chain } from "@/interfaces/backend/models/Chain";
import { useChainStore } from "@/stores/chainStore";
import { ref } from "vue";
import DropdownCheckboxFilter from "./inputs/DropdownCheckboxFilter.vue";
import DropdownSelectFilter from "./inputs/DropdownSelectFilter.vue";

interface Props {
  modelValue: JobFilter;
}

const { modelValue } = defineProps<Props>();

/**
 * Sort Options
 */
const sortOptions = [
  { value: "id", label: "Newest", checked: true },
  { value: "chain_id", label: "Chain", checked: false },
  { value: "status", label: "Status", checked: false },
];

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

/**
 * Status Options
 */
const statusOptions = [
  { value: 1, label: "Running", checked: false },
  { value: 0, label: "Error", checked: false },
];
</script>

<template>
  <div class="flex justify-between">
    <div>
      <DropdownSelectFilter
        origin="left"
        name="Sort"
        v-model="modelValue.sort"
        :options="sortOptions"
      />
    </div>

    <div class="flex items-center divide-gray-200 space-x-4 divide-x">
      <DropdownCheckboxFilter
        origin="right"
        name="Chains"
        v-model="modelValue.chains"
        :options="chainOptions"
      />
      <DropdownCheckboxFilter
        origin="right"
        class="pl-4"
        name="Status"
        v-model="modelValue.status"
        :options="statusOptions"
      />
    </div>
  </div>
</template>
