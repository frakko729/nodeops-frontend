<script lang="ts" setup>
import { ref, computed } from "vue";

export interface BreadcrumbItem {
  text: string;
  route: {};
  isActive?: boolean;
  icon?: any;
}

interface Props {
  items: BreadcrumbItem[];
}

const { items } = defineProps<Props>();
</script>

<template>
  <nav
    class="flex bg-white border border-gray-200 shadow-xs rounded-lg px-4 py-3 w-max"
    aria-label="Breadcrumb"
  >
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li v-for="(item, index) in items">
        <div class="flex items-center">
          <svg
            v-if="index !== 0"
            class="w-6 h-6 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>

          <router-link
            :to="item.route"
            :class="{
              'hover:text-gray-900': !item.isActive,
              'cursor-not-allowed': item.isActive,
              'ml-1 md:ml-2': index !== 0,
            }"
            class="text-sm font-medium text-gray-400"
            >{{ item.text }}
          </router-link>
        </div>
      </li>
    </ol>
  </nav>
</template>
