<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";
import { PencilIcon, TrashIcon } from "@heroicons/vue/solid";
import { useRoute, useRouter } from "vue-router";
import Container from "@/components/Container.vue";
import { useGeneralStore } from "@/stores/generalStore";
import { useApi } from "@/composables/api";
import Tabs from "@/components/Tabs.vue";
import TomlEditor from "@/components/TomlEditor.vue";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import { useNotification } from "@/composables/notification";
import JobOverviewTab from "./tabs/JobOverviewTab.vue";
import { useTabs } from "@/composables/tabs";
import JobErrorsTab from "./tabs/JobErrorsTab.vue";
import JobRunsTab from "./tabs/JobRunsTab.vue";

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

const errors = computed((): Array<any> => {
  if (job.value?.node_job?.runs) {
    const runs: Array<any> = job.value.node_job.runs;
    return runs.filter((run: any) => run.status === 0);
  } else {
    return [];
  }
});

const runs = computed((): Array<any> => {
  if (job.value?.node_job?.runs) {
    return job.value.node_job.runs;
  } else {
    return [];
  }
});

const errorsCount = computed((): number => errors.value.length);
const runsCount = computed((): number => runs.value.length);

const { tabs, activeTab } = useTabs([
  { name: "Overview", current: true },
  { name: "Definition", current: false },
  { name: "Errors", current: false, count: errorsCount },
  { name: "Runs", current: false, count: runsCount },
]);

const generalStore = useGeneralStore();
const router = useRouter();
const isDeleteModalOpen = ref(false);

/**
 * Open delete confirm modal
 */
const onDeleteButton = () => {
  isDeleteModalOpen.value = true;
};

/**
 * Send delete request after modal confirmation
 */
const onDeleteConfirm = async () => {
  isDeleteModalOpen.value = false;
  const { del, data, error } = useApi<any>("api/jobs/" + job.value.id);
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
          <div class="sm:flex sm:space-x-5 space-y-4 sm:space-y-0">
            <div class="flex-shrink-0">
              <img
                class="mx-auto h-16 w-16 rounded-full"
                :src="generalStore.getImage(job.chain.image)"
              />
            </div>
            <div class="h-max self-center">
              <p
                class="text-xl font-bold text-gray-900 sm:text-2xl text-center sm:text-left"
              >
                {{ job.name }}
              </p>

              <div
                class="flex space-x-2 items-center mt-2 w-max mx-auto sm:ml-0"
              >
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
                  <span v-if="job.status === 0">Stopped</span>
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

    <Tabs v-model="tabs">
      <JobOverviewTab v-if="activeTab?.name === 'Overview'" :job="job" />

      <template v-if="activeTab?.name === 'Definition'">
        <TomlEditor class="mt-4" :input="job.toml"
      /></template>

      <JobErrorsTab
        v-if="activeTab?.name === 'Errors'"
        :job="job"
        :errors="errors"
      />

      <JobRunsTab v-if="activeTab?.name === 'Runs'" :job="job" :runs="runs" />
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
