<script setup lang="ts">
import {
  ArrowsExpandIcon,
  CogIcon,
  DocumentReportIcon,
  LightningBoltIcon,
  TerminalIcon,
} from "@heroicons/vue/outline";

const items = [
  {
    name: "Ligthning fast",
    description:
      "Get your Chainlink job and oracle id in no time and start developing.",

    href: "#",
    iconColor: "bg-pink-500",
    icon: LightningBoltIcon,
  },
  {
    name: "Monitoring",
    description: "Monitor your jobs and avoid the debugging hustle.",
    href: "#",
    iconColor: "bg-yellow-500",
    icon: DocumentReportIcon,
  },
  {
    name: "Multichain support",
    description:
      "We support a wide range of chains and add new once in the future.",
    href: "#",
    iconColor: "bg-purple-500",
    icon: ArrowsExpandIcon,
  },
  {
    name: "Customization",
    description:
      "You can change headers, parms, urls and methods as you which.",
    href: "#",
    iconColor: "bg-green-500",
    icon: CogIcon,
  },
  {
    name: "Import curl",
    description: "You can import curl commands as base for your job.",
    href: "#",
    iconColor: "bg-cyan-500",
    icon: TerminalIcon,
  },
];
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 mt-8">
    <h2 class="text-lg font-medium text-gray-900">
      Create your first on-demand job
    </h2>
    <p class="mt-1 text-sm text-gray-500">
      Get started with your first on-demand Chainlink job.
    </p>
    <ul
      role="list"
      class="mt-6 border-t border-b border-gray-200 divide-y divide-gray-200"
    >
      <li v-for="(item, itemIdx) in items" :key="itemIdx">
        <div class="relative group py-4 flex items-start space-x-3">
          <div class="flex-shrink-0">
            <span
              :class="[
                item.iconColor,
                'inline-flex items-center justify-center h-10 w-10 rounded-lg',
              ]"
            >
              <component
                :is="item.icon"
                class="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </span>
          </div>
          <div class="min-w-0 flex-1">
            <div class="text-sm font-medium text-gray-900">
              {{ item.name }}
            </div>
            <p class="text-sm text-gray-500">{{ item.description }}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="mt-6 w-full">
      <button
        @click=""
        type="button"
        class="block w-full py-3 text-center items-center border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Get started
      </button>
    </div>
  </div>
</template>
