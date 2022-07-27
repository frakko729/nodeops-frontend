<script setup lang="ts">
import {
  Listbox as Listbox2,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";

import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

interface Props {
  modelValue: any;
  list: Array<any>;
}
const { modelValue } = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <Listbox2 as="div" v-model="modelValue">
    <div class="relative h-full">
      <ListboxButton
        class="h-full bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:border-blue-500 sm:text-sm"
      >
        <span class="block truncate">{{ modelValue.name }}</span>
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base focus:outline-none focus:border-blue-500 sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="item in list"
            :key="item.id"
            :value="item"
            v-slot="{ active, selected }"
            @click="emit('update:modelValue', item)"
          >
            <li
              :class="[
                active ? 'text-white bg-blue-600' : 'text-gray-900',
                'cursor-default select-none relative py-2 pl-3 pr-9',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-semibold' : 'font-normal',
                  'block truncate',
                ]"
              >
                {{ item.name }}
              </span>

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-blue-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox2>
</template>
