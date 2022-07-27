<script setup lang="ts">
import { Option } from "@/interfaces/Option";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";
import { ref, watch } from "vue";

interface Props {
  name: string;
  options: Option[];
  modelValue: string | number;
  origin: "left" | "right";
}

const { name, options, modelValue, origin } = defineProps<Props>();

const selected = ref(
  options.find((option: Option) => modelValue == option.value)
);

/**
 * Emits value back
 *
 * @param value
 */

const emit = defineEmits(["update:modelValue"]);
const onChange = (option: Option) => {
  selected.value = option;
  emit("update:modelValue", option.value);
};

/**
 * Watch for reset
 */
watch(
  () => modelValue,
  (newValue, _) => {
    selected.value = options.find(
      (option: Option) => modelValue == option.value
    );
  }
);
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        {{ name }}
        <span
          class="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums"
        >
          {{ selected?.label }}</span
        >
        <ChevronDownIcon
          class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        :class="{
          'origin-top-left left-0': origin === 'left',
          'origin-top-right right-0': origin === 'right',
        }"
        class="absolute mt-2 w-40 z-20 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem
            v-for="option in options"
            :key="option.value"
            v-slot="{ active }"
          >
            <button
              @click="onChange(option)"
              :class="[
                selected?.value === option.value
                  ? 'font-medium text-gray-900'
                  : 'text-gray-500',
                active ? 'bg-gray-100' : '',
                'block px-4 py-2 text-sm',
              ]"
              class="w-full text-left"
            >
              {{ option.label }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
