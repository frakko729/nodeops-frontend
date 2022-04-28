<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { PencilIcon } from "@heroicons/vue/solid";
import { useRoute } from "vue-router";
import Container from "@/components/Container.vue";
import { useChainStore } from "@/stores/chainStore";
import ChainlinkLogo from "@/assets/svgs/chainlink-logo.svg";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/vue/solid";
import {
  CheckIcon,
  CursorClickIcon,
  MailOpenIcon,
  UsersIcon,
} from "@heroicons/vue/outline";
import { PaperClipIcon } from "@heroicons/vue/solid";
import BarChart from "@/components/BarChart.vue";
import { useMath } from "@/composables/math";

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
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
];

const stats = [
  {
    id: 1,
    name: "Total Requests",
    stat: "71,897",
    icon: UsersIcon,
    change: "122",
    changeType: "increase",
  },
  {
    id: 2,
    name: "LINK Tokens spend",
    stat: "10.82",
    icon: ChainlinkLogo,
    change: "5.4%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Avg. Success Rate",
    stat: "96.12%",
    icon: CheckIcon,
    change: "3.2%",
    changeType: "decrease",
  },
];

// Get current job Id from router and watch for changes
const route = useRoute();
const jobId = ref();
watchEffect(() => {
  if (route.params) {
    jobId.value = route.params.jobId;
  }
});

const chainStore = useChainStore();
chainStore.loadChains();

const chartContainer = ref();
</script>

<template>
  <Container>
    <div class="rounded-lg bg-white overflow-hidden shadow">
      <h2 class="sr-only" id="job-overview-title">Job Details</h2>
      <div class="bg-white p-6">
        <div
          class="sm:flex sm:items-center sm:justify-between"
          v-if="chainStore.chains[0]"
        >
          <div class="sm:flex sm:space-x-5">
            <div class="flex-shrink-0">
              <img
                class="mx-auto h-20 w-20 rounded-full"
                :src="`http://localhost/storage/${chainStore.chains[0].image}`"
              />
            </div>
            <div class="h-max self-center">
              <p class="text-xl font-bold text-gray-900 sm:text-2xl">
                Test 12345
              </p>

              <div class="flex space-x-2 items-center mt-2">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  <svg
                    class="-ml-0.5 mr-1.5 h-2 w-2 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  Running
                </span>
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  <span v-if="chainStore.chains[0].is_mainnet">Mainnet</span>
                  <span v-else>Testnet</span>
                </span>

                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  europe-east1
                </span>
              </div>
            </div>
          </div>
          <div class="mt-5 flex justify-center sm:mt-0">
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PencilIcon
                class="-ml-1 mr-2 h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Node details
        </h3>
      </div>
      <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Provider</dt>
            <dd class="mt-1 text-sm text-gray-900">LinkConnect</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">URL</dt>
            <dd class="mt-1 text-sm text-gray-900">
              https://external-api.dev/api/example
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Oracle Id</dt>
            <dd class="mt-1 text-sm text-gray-900">
              0xD5c4D9Fe36d09e71940676b312D1500078E24C6a
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Job Id</dt>
            <dd class="mt-1 text-sm text-gray-900">
              fbb82dde27ef46c3af4d2bc0b9e2fd03
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="mt-8">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>

      <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in stats"
          :key="item.id"
          class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
        >
          <dt>
            <div class="absolute bg-blue-500 rounded-md p-3">
              <component
                :is="item.icon"
                class="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </div>
            <p class="ml-16 text-sm font-medium text-gray-500 truncate">
              {{ item.name }}
            </p>
          </dt>
          <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p class="text-2xl font-semibold text-gray-900">
              {{ item.stat }}
            </p>
            <p
              :class="[
                item.changeType === 'increase'
                  ? 'text-green-600'
                  : 'text-red-600',
                'ml-2 flex items-baseline text-sm font-semibold',
              ]"
            >
              <ArrowSmUpIcon
                v-if="item.changeType === 'increase'"
                class="self-center flex-shrink-0 h-5 w-5 text-green-500"
                aria-hidden="true"
              />
              <ArrowSmDownIcon
                v-else
                class="self-center flex-shrink-0 h-5 w-5 text-red-500"
                aria-hidden="true"
              />
              <span class="sr-only">
                {{ item.changeType === "increase" ? "Increased" : "Decreased" }}
                by
              </span>
              {{ item.change }}
            </p>
            <div
              class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6"
            >
              <div class="text-sm">
                <a
                  href="#"
                  class="font-medium text-blue-600 hover:text-blue-500"
                >
                  View all<span class="sr-only"> {{ item.name }} stats</span></a
                >
              </div>
            </div>
          </dd>
        </div>
      </dl>
    </div>

    <div class="mt-8 bg-white shadow rounded-lg p-4" ref="chartContainer">
      <BarChart
        v-if="chartContainer"
        :x="x"
        :y="randomIntArray(100, 200, 30)"
        :width="chartContainer.clientWidth"
      />
    </div>
  </Container>
</template>
