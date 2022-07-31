<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from "@headlessui/vue";
import { CheckCircleIcon } from "@heroicons/vue/solid";
import { useGeneralStore } from "@/stores/generalStore";
import { watch } from "vue";
import ChainlinkBlue from "@/assets/svgs/chainlink-blue.svg";
import { useApi } from "@/composables/api";
import { Node } from "@/interfaces/backend/models/Node";

interface Props {
  modelValue: Node;
  filter: object;
}
const { modelValue, filter } = defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

const generalStore = useGeneralStore();

const { get, data: nodes } = useApi<Node[]>("api/nodes");

/**
 * Load inital nodes
 */
get();

/**
 * Watch for filter changes and apply it to request
 */
watch(
  () => filter,
  () => {
    get(filter);
  }
);
</script>

<template>
  <div>
    <RadioGroup v-model="modelValue">
      <div class="flex justify-between">
        <RadioGroupLabel class="text-base font-medium text-gray-900">
          Select a node
        </RadioGroupLabel>
        <slot name="header"></slot>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3">
        <RadioGroupOption
          as="template"
          v-for="node in nodes"
          :key="node.id"
          :value="node"
          v-slot="{ checked, active }"
          @click="emit('update:modelValue', node)"
        >
          <div
            :class="[
              modelValue?.id === node.id
                ? 'border-transparent'
                : 'border-gray-200',
              modelValue?.id === node.id ? 'ring-2 ring-blue-500' : '',
              'relative  bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none',
            ]"
          >
            <div class="w-full">
              <div class="flex flex-col">
                <RadioGroupLabel
                  as="div"
                  class="flex flex-row items-center space-x-4"
                >
                  <ChainlinkBlue class="w-12 h-12 sm:h-16 sm:w-16" />

                  <div class="flex flex-col h-full justify-evenly">
                    <span class="text-sm font-medium text-gray-500">{{
                      node.chains?.[0].name
                    }}</span>

                    <span class="font-semibold text-2xl text-gray-800">
                      Chainlink Node
                    </span>
                  </div>
                </RadioGroupLabel>

                <RadioGroupDescription
                  as="div"
                  class="mt-6 flex flex-col space-y-5"
                >
                  <div class="flex flex-col space-y-1" v-if="node.chains">
                    <p class="text-sm font-medium text-gray-500">Network</p>
                    <div class="flex flex-row items-center space-x-2">
                      <img
                        :src="generalStore.getImage(node.chains[0].image)"
                        class="block w-6 h-6"
                      />
                      <span class="text-sm font-medium text-gray-800">{{
                        node.chains[0].name
                      }}</span>
                    </div>
                  </div>
                  <div
                    class="flex flex-row w-full space-x-4"
                    v-if="node.provider"
                  >
                    <div class="flex flex-col space-y-1 w-1/2">
                      <p class="text-sm font-medium text-gray-500">Provider</p>
                      <div class="flex flex-row items-center space-x-2">
                        <img
                          :src="generalStore.getImage(node.provider.image)"
                          class="block w-10 h-auto"
                        />
                        <span class="text-sm font-medium text-gray-800">{{
                          node.provider.name
                        }}</span>
                      </div>
                    </div>

                    <div class="flex flex-col space-y-1 w-1/2">
                      <p class="text-sm font-medium text-gray-500">Costs</p>
                      <div class="flex flex-row items-center space-x-2">
                        <span class="text-sm font-medium text-gray-800"
                          >Free</span
                        >
                      </div>
                    </div>
                  </div>
                </RadioGroupDescription>
              </div>
            </div>
            <CheckCircleIcon
              :class="[
                !(modelValue?.id === node.id) ? 'invisible' : '',
                'h-5 w-5 text-indigo-600',
              ]"
              aria-hidden="true"
            />
            <div
              :class="[
                modelValue?.id === node.id ? 'border' : 'border-2',
                modelValue?.id === node.id
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

    <div v-if="nodes?.length === 0">
      <slot name="empty"></slot>
    </div>
  </div>
</template>
