<script lang="ts" setup>
import { ref, computed } from "vue";
interface Props {
  text: string;
  color?: "red" | "green" | "blue" | "gray" | "yellow"; // refrenced in tailwind config in safelist for constructing
  statusColor?: "red" | "green" | "blue" | "gray" | "yellow";
}

const { text, color = "gray", statusColor } = defineProps<Props>();

const bgColor = computed((): string => `bg-${color}-100`);
const textColor = computed((): string => `text-${color}-800`);
const statusTextColor = computed((): string => `text-${statusColor}-400`);
</script>

<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    :class="[bgColor, textColor]"
  >
    <svg
      v-if="statusColor"
      class="-ml-0.5 mr-1.5 h-2 w-2"
      :class="statusTextColor"
      fill="currentColor"
      viewBox="0 0 8 8"
    >
      <circle cx="4" cy="4" r="3" />
    </svg>
    <span>{{ text }}</span>
  </span>
</template>
