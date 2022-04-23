<script setup lang="ts">
import { useUI } from "../composables/ui";
const { collectionName, currentYear, socialNavigation } = useUI();
</script>

<template>
  <footer class="bg-black">
    <div
      class="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8"
    >
      <div class="flex justify-center space-x-6 md:order-2">
        <a
          v-for="item in socialNavigation"
          :key="item.name"
          :href="item.href"
          class="text-gray-400 hover:text-gray-50"
        >
          <span class="sr-only">{{ item.name }}</span>
          <component :is="item.icon" class="h-6 w-6"></component>
        </a>
      </div>
      <div class="mt-8 md:mt-0 md:order-1">
        <p class="text-center text-base text-gray-400">
          &copy; {{ currentYear }} {{ collectionName }}, All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
