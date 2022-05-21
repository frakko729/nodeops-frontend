<script lang="ts" setup>
import { ArrowSmUpIcon, ArrowSmDownIcon } from "@heroicons/vue/outline";

interface Props {
  stat: any;
}
const { stat } = defineProps<Props>();
</script>

<template>
  <div
    class="relative bg-white pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
  >
    <dt>
      <div class="absolute bg-blue-500 rounded-md p-3">
        <component
          :is="stat.icon"
          class="h-6 w-6 text-white"
          aria-hidden="true"
        />
      </div>
      <p class="ml-16 text-sm font-medium text-gray-500 truncate">
        {{ stat.name }}
      </p>
    </dt>
    <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
      <p class="text-2xl font-semibold text-gray-900">
        {{ stat.stat }}
      </p>
      <p
        v-if="stat.changeType != ''"
        :class="[
          stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
          'ml-2 flex items-baseline text-sm font-semibold',
        ]"
      >
        <ArrowSmUpIcon
          v-if="stat.changeType === 'increase'"
          class="self-center flex-shrink-0 h-5 w-5 text-green-500"
          aria-hidden="true"
        />
        <ArrowSmDownIcon
          v-else
          class="self-center flex-shrink-0 h-5 w-5 text-red-500"
          aria-hidden="true"
        />
        <span class="sr-only" v-if="stat.changeType != ''">
          {{ stat.changeType === "increase" ? "Increased" : "Decreased" }}
          by
        </span>
        {{ stat.change }}
      </p>
    </dd>
  </div>
</template>
