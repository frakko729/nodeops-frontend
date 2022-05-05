<script setup lang="ts">
import { useRouter } from "vue-router";
import { ChevronRightIcon, LinkIcon } from "@heroicons/vue/solid";
import SimpleBarChart from "@/components/SimpleBarChart.vue";
import Container from "@/components/Container.vue";
import { useMath } from "@/composables/math";
import { FilterIcon, PlusIcon } from "@heroicons/vue/solid";
import { ref } from "vue";
import Filter from "@/components/Filter.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import { useChainStore } from "@/stores/chainStore";

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

const chainStore = useChainStore();
chainStore.loadChains();

const jobs = [
  {
    url: "https://external-api.dev/api/example",
    name: "Project ABC",
    href: "/jobs/1",
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
    href: "/jobs/2",
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
    href: "/jobs/3",
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
    href: "/jobs/4",
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

const backend = import.meta.env.VITE_BACKEND_ENDPOINT;
</script>

<template>
  <Container>
    <!-- Header -->
    <SectionHeader
      title="On-Demand Jobs"
      class="flex justify-between items-center mb-2 sm:mb-4"
    >
      <div class="flex flex-row space-x-2 sm:space-x-4">
        <button
          @click="onFilter()"
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <FilterIcon class="sm:-ml-1 sm:mr-2 h-5 w-5" aria-hidden="true" />
          <span class="hidden sm:block">Filter</span>
        </button>
        <button
          @click="onCreateJob()"
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon class="sm:-ml-1 sm:mr-2 h-5 w-5" aria-hidden="true" />
          <span class="hidden sm:block">Create</span>
        </button>
      </div>
    </SectionHeader>

    <!-- Filter -->
    <Filter :show="showFilter" />

    <!-- Job list -->
    <ul role="list" class="space-y-4 mt-4">
      <li v-for="job in jobs" :key="job.name">
        <router-link
          :to="job.href"
          class="h-full flex bg-white shadow hover:shadow-md overflow-hidden rounded-md group transition-all"
        >
          <div
            :class="{
              'bg-green-400 group-hover:bg-green-500': job.status === 'running',
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
              <div
                class="flex space-x-4 w-1/6"
                v-if="chainStore.chains.length != 0"
              >
                <img
                  :src="`${backend}storage/${chainStore.chains[0].image}`"
                  class="h-12 w-12 rounded-full opacity-80 group-hover:opacity-100 transition"
                />
                <div
                  class="self-center h-max bg-blue-100 text-blue-800 w-max inline-flex items-center px-2 py-0 rounded-full text-xs font-medium"
                >
                  <span v-if="chainStore.chains[0].is_mainnet">Mainnet</span>
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
        </router-link>
      </li>
    </ul>
  </Container>
</template>
