<script setup lang="ts">
import { Option } from "@/interfaces/Option";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";
import { computed, ref, watch } from "vue";

interface Props {
  name: string;
  options: Option[];
  modelValue: any[];
  origin: "left" | "right";
}

const { name, options, modelValue, origin } = defineProps<Props>();

/**
 * Holds the checked checkboxes
 */
const checked = ref<boolean[]>([]);

/**
 * Get count for checked checkboxes
 */
const checkedSize = computed(
  (): number => checked.value.filter((item: boolean) => item === true).length
);

/**
 * Looks for prechecked options
 */
watch(
  () => options,
  () => {
    options
      .filter((option: Option) => option.checked)
      .forEach((option: Option, index: number) => {
        checked.value[index] = true;
        modelValue[index] = option.value;
      });
  }
);

/**
 * Watch for reset
 */
watch(
  () => modelValue.length,
  (newValue, _) => {
    if (newValue === 0) {
      checked.value = [];
    }
  }
);

/**
 * Emits values instead of booleans back to modelValue
 *
 * @param value
 */
const onChange = (value: any) => {
  const index = modelValue.findIndex((item: any) => item === value);
  if (index === -1) {
    modelValue.push(value);
  } else {
    modelValue.splice(index, 1);
  }
};
</script>

<template>
  <PopoverGroup class="flex items-center">
    <Popover class="relative inline-block text-left" v-slot="{ open }">
      <PopoverButton
        class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        <span>{{ name }}</span>
        <span
          v-if="checkedSize !== 0"
          class="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums"
          >{{ checkedSize }}</span
        >
        <ChevronDownIcon
          class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
      </PopoverButton>

      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div v-if="open">
          <PopoverPanel
            :class="{
              'origin-top-left left-0': origin === 'left',
              'origin-top-right right-0': origin === 'right',
            }"
            class="absolute mt-2 z-20 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <form class="space-y-4">
              <div
                v-for="(option, optionIdx) in options"
                :key="option.value"
                class="flex items-center"
              >
                <input
                  type="checkbox"
                  :id="`filter-${name}-${optionIdx}`"
                  :name="`${name}[]`"
                  v-model="checked[optionIdx]"
                  @change="onChange(option.value)"
                  class="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                />
                <label
                  :for="`filter-${name}-${optionIdx}`"
                  class="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                >
                  {{ option.label }}
                </label>
              </div>
            </form>
          </PopoverPanel>
        </div>
      </transition>
    </Popover>
  </PopoverGroup>
</template>
