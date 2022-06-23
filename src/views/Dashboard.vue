<script setup lang="ts">
import Container from "@/components/Container.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import { CheckIcon, UsersIcon } from "@heroicons/vue/outline";
import ChainlinkLogo from "@/assets/svgs/chainlink-logo.svg";
import StatCard from "@/components/StatCard.vue";
import { useApi } from "@/composables/api";
import JobListItem from "@/components/JobListItem.vue";
import BarChart from "@/components/charts/BarChart.vue";
import { ref } from "vue";
import EmptyState from "@/components/EmptyState.vue";
import { useRouter } from "vue-router";

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
    name: "LINK Tokens",
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

const { get, loading, data: jobs, error } = useApi<Array<any>>("api/jobs");
get();

const router = useRouter();
const onCreateJob = () => {
  router.push({ name: "job-create" });
};
</script>

<template>
  <Container>
    <SectionHeader title="Dashboard" />
    <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Stat list -->
      <StatCard
        class="col-span-3 sm:col-span-1"
        v-for="(item, id) in stats"
        :stat="item"
        :key="id"
      />

      <!-- Bar Chart -->
      <div
        class="col-span-3 mt-4 bg-white shadow rounded-lg p-1"
        ref="chartContainer"
      >
        <BarChart
          v-if="chartContainer"
          :x="[]"
          :y="[]"
          :height="320"
          :width="chartContainer.clientWidth"
        />
      </div>

      <!-- Job list -->
      <div class="col-span-3 mt-6">
        <SectionHeader title="Jobs" class="flex items-end justify-between">
          <router-link
            v-if="jobs && jobs.length"
            class="text-blue-600 hover:text-blue-900 text-sm"
            :to="{ name: 'jobs' }"
            >See all</router-link
          >
        </SectionHeader>
        <ul role="list" class="space-y-4 mt-4" v-if="jobs && jobs.length">
          <JobListItem v-for="job in jobs" :key="job.name" :job="job" />
        </ul>
        <div class="mt-4" v-else>
          <EmptyState
            @click="onCreateJob()"
            text="You don't have any jobs, create your first one in just a few clicks."
          />
        </div>
      </div>
    </div>
  </Container>
</template>
