<script setup lang="ts">
import { Ref, ref, watch } from "vue";
import { useWallet } from "../composables/wallet";
import { useDebounce } from "../composables/debounce";
import Gas from "@/assets/svgs/gas.svg";

const animateGas = ref(false);
const { gas } = useWallet();

const { debouncedRef } = useDebounce();
const debouncedGas: Ref<number> = debouncedRef(gas.value, 500, true);

watch(gas, () => {
  debouncedGas.value = gas.value;
  animateGas.value = true;
  setTimeout(() => {
    animateGas.value = false;
  }, 2000);
});
</script>

<template>
  <div
    class="bg-gray-800 rounded px-5 h-12 flex items-center space-x-2"
    :class="{ 'animate-pulse': animateGas }"
  >
    <Gas class="w-4 h-4 text-gray-50" />
    <span class="block text-sm text-gray-50 font-medium"
      >{{ Math.round(debouncedGas) }} Gwei</span
    >
  </div>
</template>
