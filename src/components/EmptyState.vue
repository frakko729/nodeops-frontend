<script lang="ts" setup>
import { PlusCircleIcon } from "@heroicons/vue/outline";

interface Props {
  text: string;
  icon?: any;
}

const { text, icon = PlusCircleIcon } = defineProps<Props>();

const emit = defineEmits(["click"]);

const onClick = () => {
  emit("click");
};
</script>

<template>
  <button
    @click="onClick()"
    type="button"
    class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none"
  >
    <component :is="icon" class="mx-auto h-12 w-12 text-gray-400" />
    <span class="mt-2 block text-sm font-medium text-gray-900">
      {{ text }}
    </span>
  </button>
</template>
