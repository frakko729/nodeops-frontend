<script lang="ts" setup>
import {
  CheckIcon,
  UsersIcon,
  ArrowSmUpIcon,
  ArrowSmDownIcon,
} from "@heroicons/vue/outline";
import ChainlinkLogo from "@/assets/svgs/chainlink-logo.svg";
import BarChart from "@/components/charts/BarChart.vue";
import { ref } from "vue";
import { useMath } from "@/composables/math";
import Clipboard from "@/components/Clipboard.vue";

interface Props {
  job: any;
}
const { job } = defineProps<Props>();

const stats = [
  {
    id: 1,
    name: "Total Requests",
    stat: "N/A",
    icon: UsersIcon,
    changeType: "",
    change: "",
    // change: "122",
    // changeType: "increase",
  },
  {
    id: 2,
    name: "LINK Tokens spend",
    stat: "N/A",
    icon: ChainlinkLogo,
    changeType: "",
    change: "",
    //  change: "5.4%",
    //  changeType: "increase",
  },
  {
    id: 3,
    name: "Avg. Success Rate",
    stat: "N/A",
    icon: CheckIcon,
    changeType: "",
    change: "",
    //  change: "3.2%",
    //  changeType: "decrease",
  },
];

const chartContainer = ref(); // chart dom ref, for applying dynamic width
const { randomIntArray } = useMath(); // generates dummy data for the chart
</script>

<template>
  <div>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Overview</h3>
      </div>
      <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Provider</dt>
            <dd class="mt-1 text-sm text-gray-900">NodeOps</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">URL</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ job.url }}
            </dd>
          </div>
          <div class="sm:col-span-1 relative w-max">
            <dt class="text-sm font-medium text-gray-500">Oracle Id</dt>
            <dd class="mt-1 text-sm text-gray-900 flex">
              <span v-if="job.node?.oracle_address">{{
                job.node.oracle_address
              }}</span>
              <span v-else>n/a</span>
            </dd>
            <Clipboard
              v-if="job.node?.oracle_address"
              title="Oracle Id"
              :source="job.node.oracle_address"
              class="absolute -right-10 top-5"
            />
          </div>
          <div class="sm:col-span-1 relative w-max">
            <dt class="text-sm font-medium text-gray-500">Job Id</dt>
            <dd class="mt-1 text-sm text-gray-900">
              <span v-if="job.external_job_id">{{
                job.external_job_id.replace(/-/g, "")
              }}</span>
              <span v-else>n/a</span>
            </dd>
            <Clipboard
              title="Job Id"
              v-if="job.node?.oracle_address"
              :source="job.node.oracle_address"
              class="absolute -right-10 top-5"
            />
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
          class="relative bg-white pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
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
              v-if="item.changeType != ''"
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
              <span class="sr-only" v-if="item.changeType != ''">
                {{ item.changeType === "increase" ? "Increased" : "Decreased" }}
                by
              </span>
              {{ item.change }}
            </p>
          </dd>
        </div>
      </dl>
    </div>
    <div class="mt-8 bg-white shadow rounded-lg p-4" ref="chartContainer">
      <BarChart
        v-if="chartContainer"
        :x="[
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30',
        ]"
        :y="randomIntArray(100, 200, 30)"
        :width="chartContainer.clientWidth"
      />
    </div>
  </div>
</template>
