<script setup lang="ts">
interface Props {
  title: string;
}

const { title } = defineProps<Props>();
</script>

<template>
  <div>
    <h2
      class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
    >
      {{ title }}
    </h2>

    <slot></slot>
  </div>
</template>
