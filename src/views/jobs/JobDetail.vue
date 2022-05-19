<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { PencilIcon, TrashIcon } from "@heroicons/vue/solid";
import { useRoute, useRouter } from "vue-router";
import Container from "@/components/Container.vue";
import ChainlinkLogo from "@/assets/svgs/chainlink-logo.svg";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/vue/solid";
import { CheckIcon, UsersIcon } from "@heroicons/vue/outline";
import BarChart from "@/components/charts/BarChart.vue";
import { useMath } from "@/composables/math";
import { useGeneralStore } from "@/stores/generalStore";
import { useApi } from "@/composables/api";
import Tabs from "@/components/Tabs.vue";
import TomlEditor from "@/components/TomlEditor.vue";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import { useNotification } from "@/composables/notification";

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
    stat: "N/A",
    icon: UsersIcon,
    changeType: "",
    change: "",
  },
  {
    id: 2,
    name: "LINK Tokens spend",
    stat: "N/A",
    icon: ChainlinkLogo,
    changeType: "",
    change: "",
  },
  {
    id: 3,
    name: "Avg. Success Rate",
    stat: "N/A",
    icon: CheckIcon,
    changeType: "",
    change: "",
  },
];

/**
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
*/

const {
  get,
  loading,
  data: job,
  overrideEndpoint,
  error,
} = useApi<any>("api/jobs/");

const route = useRoute();
const jobId = ref();

watchEffect(() => {
  if (route.params) {
    jobId.value = route.params.jobId;
    if (jobId.value) {
      overrideEndpoint("api/jobs/" + jobId.value);
      get();
    }
  }
});

const chartContainer = ref();
const generalStore = useGeneralStore();

const tabs: Array<any> = [
  { name: "Overview", current: true },
  { name: "Definition", current: false },
  { name: "Errors", current: false },
  { name: "Runs", current: false },
];

const isDeleteModalOpen = ref(false);
const onDeleteButton = () => {
  isDeleteModalOpen.value = true;
};

const router = useRouter();
const onDeleteConfirm = async () => {
  isDeleteModalOpen.value = false;
  const { del, loading, data, error } = useApi<any>("api/jobs/" + job.value.id);
  await del();

  if (data.value && !error.value) {
    const { showSuccess } = useNotification();
    showSuccess("Your job has been successfully deleted.");
    router.push({ name: "jobs" });
  }
};
</script>

<template>
  <Container v-if="job">
    <div class="rounded-lg bg-white overflow-hidden shadow">
      <h2 class="sr-only" id="job-overview-title">Job Details</h2>
      <div class="bg-white p-6">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="sm:flex sm:space-x-5">
            <div class="flex-shrink-0">
              <img
                class="mx-auto h-20 w-20 rounded-full"
                :src="generalStore.getImage(job.chain.image)"
              />
            </div>
            <div class="h-max self-center">
              <p class="text-xl font-bold text-gray-900 sm:text-2xl">
                {{ job.name }}
              </p>

              <div class="flex space-x-2 items-center mt-2">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  <svg
                    :class="{
                      'text-green-400 ': job.status === 1,
                      'text-yellow-400 ': job.status === 0,
                      'text-red-400 ': job.status === -1,
                    }"
                    class="-ml-0.5 mr-1.5 h-2 w-2"
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  <span v-if="job.status === 1">Running</span>
                  <span v-if="job.status === 0">Preparation</span>
                  <span v-if="job.status === -1">Stopped</span>
                </span>
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  <span v-if="job.chain.is_mainnet">Mainnet</span>
                  <span v-else>Testnet</span>
                </span>

                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  n/a
                </span>
              </div>
            </div>
          </div>
          <div class="mt-5 flex space-x-4 justify-center sm:mt-0">
            <router-link :to="{ name: 'job-edit', params: { jobId: job.id } }">
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PencilIcon
                  class="-ml-1 mr-2 h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
                Edit
              </button>
            </router-link>
            <button
              @click="onDeleteButton()"
              type="button"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <TrashIcon
                class="-ml-1 mr-2 h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <Tabs :tabs="tabs" v-slot="{ activeTab }">
      <!-- Tab Overview Start -->
      <div v-if="activeTab?.name === 'Overview'">
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Node details
            </h3>
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
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Oracle Id</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  <span v-if="job.node?.oracle_address">{{
                    job.node.oracle_address
                  }}</span>
                  <span v-else>n/a</span>
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Job Id</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  <span v-if="job.external_job_id">{{
                    job.external_job_id.replace(/-/g, "")
                  }}</span>
                  <span v-else>n/a</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div class="mt-8">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Last 30 days
          </h3>

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
                    {{
                      item.changeType === "increase" ? "Increased" : "Decreased"
                    }}
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
            :x="x"
            :y="randomIntArray(100, 200, 30)"
            :width="chartContainer.clientWidth"
          />
        </div>
      </div>
      <!-- Tab Overview End -->

      <!-- Tab Definition Start -->
      <div v-if="activeTab?.name === 'Definition'">
        <TomlEditor class="mt-4" :input="job.toml" />
      </div>
      <!-- Tab Definition Stop -->
    </Tabs>

    <teleport to="body">
      <ConfirmModal
        :open="isDeleteModalOpen"
        :icon="TrashIcon"
        @close="isDeleteModalOpen = false"
        @confirm="onDeleteConfirm()"
      />
    </teleport>
  </Container>
</template>
