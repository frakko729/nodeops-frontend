<script setup lang="ts">
import { Step } from "@/interfaces/Step";

interface Props {
  steps: Step[];
}

const { steps } = defineProps<Props>();

const emit = defineEmits(["step"]);
</script>

<template>
  <nav aria-label="Progress">
    <ol
      role="list"
      class="space-y-4 md:flex md:space-y-0 md:space-x-4 lg:space-x-8"
    >
      <li v-for="(step, index) in steps" :key="step.name" class="md:flex-1">
        <button
          @click="emit('step', index)"
          v-if="step.status === 'complete'"
          class="w-full group pl-4 py-2 flex flex-col border-l-4 border-blue-600 hover:border-blue-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
        >
          <span
            class="text-xs text-blue-600 font-semibold tracking-wide uppercase group-hover:text-blue-800"
            >{{ step.id }}</span
          >
          <span class="text-sm font-medium">{{ step.name }}</span>
        </button>
        <button
          disabled="true"
          v-else-if="step.status === 'current'"
          class="w-full pl-4 py-2 flex flex-col border-l-4 border-blue-600 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
          aria-current="step"
        >
          <span
            class="text-xs text-blue-600 font-semibold tracking-wide uppercase"
            >{{ step.id }}</span
          >
          <span class="text-sm font-medium">{{ step.name }}</span>
        </button>
        <button
          disabled="true"
          v-else
          class="w-full group pl-4 py-2 flex flex-col border-l-4 border-gray-200 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
        >
          <span
            class="text-xs text-gray-500 font-semibold tracking-wide uppercase"
            >{{ step.id }}</span
          >
          <span class="text-sm font-medium">{{ step.name }}</span>
        </button>
      </li>
    </ol>
  </nav>
</template>
