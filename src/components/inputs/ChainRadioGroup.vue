<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from "@headlessui/vue";
import { CheckCircleIcon } from "@heroicons/vue/solid";
import { useChainStore } from "@/stores/chainStore";
import { useGeneralStore } from "@/stores/generalStore";
import { onMounted } from "vue";
import { Chain } from "@/interfaces/backend/models/Chain";

interface Props {
  modelValue: Chain;
}
const { modelValue } = defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

const generalStore = useGeneralStore();
const chainStore = useChainStore();

onMounted(() => {
  chainStore.loadChains();
});
</script>

<template>
  <RadioGroup v-if="chainStore.chains" v-model="modelValue">
    <RadioGroupLabel class="text-base font-medium text-gray-900">
      Select a chain
    </RadioGroupLabel>

    <div class="mt-4 grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3">
      <RadioGroupOption
        as="template"
        v-for="chain in chainStore.chains"
        :key="chain.id"
        :value="chain"
        v-slot="{ checked, active }"
        @click="emit('update:modelValue', chain)"
      >
        <div
          :class="[
            modelValue.id === chain.id
              ? 'border-transparent'
              : 'border-gray-200',
            modelValue.id === chain.id ? 'ring-2 ring-blue-500' : '',
            'relative  bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none',
          ]"
        >
          <div class="flex-1 flex">
            <div class="flex flex-col">
              <RadioGroupLabel
                as="div"
                class="block text-sm font-medium text-gray-900"
              >
                <img
                  :src="generalStore.getImage(chain.image)"
                  class="block w-12 h-12 sm:h-16 sm:w-16"
                />

                <span class="block mt-4 text-gray-700">{{ chain.name }}</span>
              </RadioGroupLabel>

              <RadioGroupDescription
                as="span"
                :class="{
                  'bg-blue-100 text-blue-800': chain.isMainnet,
                  'bg-red-100 text-red-800': !chain.isMainnet,
                }"
                class="mt-2 w-max inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                <span v-if="chain.isMainnet">Mainnet</span>
                <span v-else>Testnet</span>
              </RadioGroupDescription>
            </div>
          </div>
          <CheckCircleIcon
            :class="[
              !(modelValue.id === chain.id) ? 'invisible' : '',
              'h-5 w-5 text-indigo-600',
            ]"
            aria-hidden="true"
          />
          <div
            :class="[
              modelValue.id === chain.id ? 'border' : 'border-2',
              modelValue.id === chain.id
                ? 'border-blue-500'
                : 'border-transparent',
              'absolute -inset-px rounded-lg pointer-events-none',
            ]"
            aria-hidden="true"
          />
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
