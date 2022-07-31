<script lang="ts" setup>
import { CheckIcon, UsersIcon } from "@heroicons/vue/outline";
import ChainlinkLogo from "@/assets/svgs/chainlink-logo.svg";
import BarChart from "@/components/charts/BarChart.vue";
import { computed, ref } from "vue";
import Clipboard from "@/components/Clipboard.vue";
import StatCard from "@/components/StatCard.vue";
import { useApi } from "@/composables/api";
import { Job } from "@/interfaces/backend/models/Job";

interface Props {
  job: Job;
}
const { job } = defineProps<Props>();

const { get: getTotal, data: totalData } = useApi<any>(
  `api/metrics/jobs/${job.id}/total`
);
getTotal();

const { get: getTimeline, data: timelineData } = useApi<Array<any>>(
  `api/metrics/jobs/${job.id}/timeline`
);

getTimeline();

const timelineXAxis = computed(
  (): Array<any> => timelineData.value?.map((item: any) => item.date) || []
);

const timelineYAxis = computed(
  (): Array<any> => timelineData.value?.map((item: any) => item.count) || []
);

const stats = [
  {
    id: 1,
    name: "Total Requests",
    stat: totalData,
    icon: UsersIcon,
    changeType: "",
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
          <div
            class="sm:col-span-1 relative w-max"
            v-if="job.deployments && job.deployments[0].node"
          >
            <dt class="text-sm font-medium text-gray-500">Oracle Id</dt>
            <dd class="mt-1 text-sm text-gray-900 flex">
              <span v-if="job.deployments[0].node.oracleAddress">{{
                job.deployments[0].node.oracleAddress
              }}</span>
              <span v-else>n/a</span>
            </dd>
            <Clipboard
              v-if="job.deployments[0].node.oracleAddress"
              title="Oracle Id"
              :source="job.deployments[0].node.oracleAddress"
              class="absolute -right-10 top-5"
            />
          </div>
          <div class="sm:col-span-1 relative w-max" v-if="job.deployments">
            <dt class="text-sm font-medium text-gray-500">Job Id</dt>
            <dd class="mt-1 text-sm text-gray-900">
              <span v-if="job.deployments[0].externalJobId">{{
                job.deployments[0].externalJobId.replace(/-/g, "")
              }}</span>
              <span v-else>n/a</span>
            </dd>
            <Clipboard
              title="Job Id"
              v-if="job.deployments[0].externalJobId"
              :source="job.deployments[0].externalJobId.replace(/-/g, '')"
              class="absolute -right-10 top-5"
            />
          </div>
        </dl>
      </div>
    </div>

    <div class="mt-8">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>

      <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard v-for="(item, id) in stats" :stat="item" :key="id" />
      </dl>
    </div>
    <div class="mt-8 bg-white shadow rounded-lg p-1" ref="chartContainer">
      <BarChart
        v-if="chartContainer && timelineData"
        :x="timelineXAxis"
        :y="timelineYAxis"
        :width="chartContainer.clientWidth"
      />
    </div>
  </div>
</template>
