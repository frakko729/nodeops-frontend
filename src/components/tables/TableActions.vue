<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  DuplicateIcon,
  PencilAltIcon,
  TrashIcon,
  CogIcon,
} from "@heroicons/vue/solid";
import { computed } from "vue";

interface Props {
  hideActions?: Array<string>;
}

const { hideActions } = defineProps<Props>();

const actions = [
  {
    name: "Edit",
    emit: "edit" as "edit" | "duplicate" | "remove",
    icon: PencilAltIcon,
  },
  {
    name: "Duplicate",
    emit: "duplicate" as "edit" | "duplicate" | "remove",
    icon: DuplicateIcon,
  },
  {
    name: "Remove",
    emit: "remove" as "edit" | "duplicate" | "remove",
    icon: TrashIcon,
  },
];

const filterdAction = computed(() =>
  actions.filter((item: any) => {
    if (!hideActions) {
      return actions;
    }

    return !hideActions.includes(item.name.toLowerCase());
  })
);

const emit = defineEmits(["edit", "duplicate", "remove"]);
</script>
<template>
  <Menu as="div" class="relative w-6">
    <div>
      <MenuButton
        class="focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full"
      >
        <CogIcon
          class="h-6 w-6 text-gray-600 hover:text-gray-800 transition-colors"
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
        class="z-50 origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1" v-for="action in filterdAction">
          <MenuItem v-slot="{ active }">
            <button
              @click="emit(action.emit)"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'group flex items-center px-4 py-2 text-sm w-full',
              ]"
            >
              <component
                :is="action.icon"
                class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              {{ action.name }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
