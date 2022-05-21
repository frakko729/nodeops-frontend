<script lang="ts" setup>
import { ChevronRightIcon, LinkIcon } from "@heroicons/vue/solid";
import SimpleBarChart from "@/components/charts/SimpleBarChart.vue";
import { useGeneralStore } from "@/stores/generalStore";
import { useMath } from "@/composables/math";

interface Props {
  job: any;
}
const { job } = defineProps<Props>();

const generalStore = useGeneralStore();

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
const y = randomIntArray(100, 200, 14);
const z = randomIntArray(1, 1, 14);
</script>

<template>
  <li>
    <router-link
      :to="{ name: 'job-detail', params: { jobId: job.id } }"
      class="h-full flex bg-white shadow hover:shadow-md overflow-hidden rounded-md group transition-all"
    >
      <div
        :class="{
          'bg-green-400 group-hover:bg-green-500': job.status === 1,
          'bg-yellow-400 group-hover:bg-yellow-500': job.status === 0,
          'bg-red-400 group-hover:bg-red-500': job.status === -1,
        }"
        class="w-2 sm:w-4 h-20 transition-colors rounded-l-md"
      ></div>
      <div class="flex items-center px-0 py-4 sm:px-2 w-11/12 md:w-full">
        <div
          class="flex sm:flex-row px-4 space-x-8 md:space-x-8 lg:space-x-16 w-full"
        >
          <div class="w-3/6 md:w-4/12 lg:w-5/12">
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
          <div class="flex space-x-4 w-2/6 md:w-12">
            <img
              :src="generalStore.getImage(job.chain.image)"
              class="h-12 w-12 rounded-full opacity-80 group-hover:opacity-100 transition"
            />
            <div
              class="hidden sm:inline-flex self-center h-max bg-blue-100 text-blue-800 w-max items-center px-2 py-0 rounded-full text-xs font-medium"
            >
              <span v-if="job.chain.is_mainnet">Mainnet</span>
              <span v-else>Testnet</span>
            </div>
          </div>
          <div
            class="md:w-5/12 lg:w-2/6 hidden md:flex md:h-max md:self-center md:justify-end"
          >
            <SimpleBarChart :x="x" :y="y" :z="z" :width="200" />
          </div>
          <div class="w-20 sm:w-1/12 flex items-center">
            <span class="text-gray-600 text-2xl leading-relaxed font-medium"
              >100%</span
            >
          </div>
        </div>
        <div class="md:px-2 lg:px-4">
          <ChevronRightIcon
            class="h-5 w-5 text-gray-300 group-hover:text-gray-400 transition-colors"
            aria-hidden="true"
          />
        </div>
      </div>
    </router-link>
  </li>
</template>
