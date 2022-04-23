<script setup lang="ts">
import { useRouter } from "vue-router";
import { ChevronRightIcon, LinkIcon } from "@heroicons/vue/solid";
import { useChain } from "../composables/chains";
import SimpleBarChart from "../components/SimpleBarChart.vue";
import { useMath } from "../composables/math";
import { FilterIcon, PlusIcon } from "@heroicons/vue/solid";
import { ref } from "vue";
import Filter from "../components/Filter.vue";

const { chains } = useChain();
const { randomIntArray } = useMath();

const x = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
];

const jobs = [
  {
    url: "https://external-api.dev/api/example",
    name: "Project ABC",
    chain: chains[1],
    href: "#",
    status: "running",
    chart: {
      x: x,
      y: randomIntArray(100, 200, 14),
      z: randomIntArray(1, 1, 14),
    },
  },
  {
    url: "https://external-api.dev/api/example",
    name: "NFT XYZ",
    chain: chains[6],
    href: "#",
    status: "running",
    chart: {
      x: x,
      y: randomIntArray(100, 300, 14),
      z: randomIntArray(1, 1, 14),
    },
  },
  {
    url: "https://external-api.dev/api/example",
    name: "Hackathon UVW",
    chain: chains[10],
    href: "#",
    status: "warning",
    chart: {
      x: x,
      y: randomIntArray(100, 200, 14),
      z: randomIntArray(1, 2, 14),
    },
  },
  {
    url: "https://external-api.dev/api/example",
    name: "Hackathon ERL",
    chain: chains[8],
    href: "#",
    status: "error",
    chart: {
      x: x,
      y: randomIntArray(0, 100, 14),
      z: randomIntArray(1, 3, 14),
    },
  },
];

const router = useRouter();
const onCreateJob = () => {
  router.push({ name: "job-create" });
};

const showFilter = ref(false);
const onFilter = () => {
  showFilter.value = !showFilter.value;
};
</script>

<template>
  <div>
    <div class="max-w-6xl mx-auto mt-8 px-4 md:px-6 lg:px-8 flex flex-col">
      <!-- Header -->

      <div class="flex justify-between items-center mb-4">
        <h2
          class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
        >
          On-Demand Jobs
        </h2>

        <div class="flex flex-row space-x-4">
          <button
            @click="onFilter()"
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <FilterIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Filter
          </button>
          <button
            @click="onCreateJob()"
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Create
          </button>
        </div>
      </div>

      <!-- Filter -->
      <Filter :show="showFilter" />

      <!-- Job list -->
      <ul role="list" class="space-y-4 mt-4">
        <li v-for="job in jobs" :key="job.name">
          <a
            :href="job.href"
            class="h-full flex bg-white shadow hover:shadow-md overflow-hidden rounded-md group transition-all"
          >
            <div
              :class="{
                'bg-green-400 group-hover:bg-green-500':
                  job.status === 'running',
                'bg-yellow-400 group-hover:bg-yellow-500':
                  job.status === 'warning',
                'bg-red-400 group-hover:bg-red-500': job.status === 'error',
              }"
              class="w-4 h-20 transition-colors rounded-l-md"
            ></div>
            <div class="flex items-center px-4 py-4 sm:px-2 w-full">
              <div class="flex px-4 space-x-16 w-full">
                <div class="w-2/6">
                  <p class="text-sm font-medium text-gray-700 truncate">
                    {{ job.name }}
                  </p>

                  <p class="mt-2 flex items-center text-sm text-gray-500">
                    <LinkIcon
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span class="truncate">{{ job.url }}</span>
                  </p>
                </div>
                <div class="flex space-x-4 w-1/6">
                  <component
                    class="h-12 w-12 rounded-full opacity-80 group-hover:opacity-100 transition"
                    :is="job.chain.icon"
                  ></component>
                  <div
                    class="self-center h-max bg-blue-100 text-blue-800 w-max inline-flex items-center px-2 py-0 rounded-full text-xs font-medium"
                  >
                    <span v-if="job.chain.isMainnet">Mainnet</span>
                    <span v-else>Testnet</span>
                  </div>
                </div>
                <div class="w-2/6 flex h-max self-center">
                  <SimpleBarChart
                    :x="job.chart.x"
                    :y="job.chart.y"
                    :z="job.chart.z"
                    :width="200"
                  />
                </div>
                <div class="w-1/6"></div>
              </div>
              <div class="px-4">
                <ChevronRightIcon
                  class="h-5 w-5 text-gray-300 group-hover:text-gray-400 transition-colors"
                  aria-hidden="true"
                />
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
