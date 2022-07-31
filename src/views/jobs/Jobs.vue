<script setup lang="ts">
import { useRouter } from "vue-router";
import Container from "@/components/Container.vue";
import { PlusIcon, TrashIcon } from "@heroicons/vue/solid";
import { watch } from "vue";
import SectionHeader from "@/components/SectionHeader.vue";
import { useApi } from "@/composables/api";
import JobListItem from "@/components/JobListItem.vue";
import JobFilter from "../../components/filters/JobFilter.vue";
import { useFilter } from "@/composables/filter";
import EmptyState from "@/components/EmptyState.vue";
import { Job } from "@/interfaces/backend/models/Job";
import { JobFilter as JobFilterI } from "@/interfaces/backend/filters/JobFilter";

const router = useRouter();
const { get, loading, data: jobs, error } = useApi<Job[]>("api/jobs");

/**
 * Load inital jobs and redirct, if empty
 */
get().then(() => {
  if (jobs.value?.length === 0) {
    router.push({ name: "job-create", query: { new: "true" } });
  }
});

/**
 * Create job redirect
 */
const onCreateJob = () => {
  router.push({ name: "job-create" });
};

/**
 * Reactive Filter with helpers
 */
const { reactiveFilter, parmFilter, isFilterd, resetFilter } =
  useFilter<JobFilterI>({
    sort: "id",
    chains: [],
    status: [],
  });

/**
 * Watch for filter changes and apply it to request
 */
watch(reactiveFilter.value, () => {
  get(parmFilter.value);
});
</script>

<template>
  <Container>
    <!-- Header -->
    <SectionHeader
      title="On-Demand Jobs"
      class="flex justify-between items-center mb-2 sm:mb-4"
    >
      <button
        @click="onCreateJob()"
        type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusIcon class="sm:-ml-1 sm:mr-2 h-5 w-5" aria-hidden="true" />
        <span class="hidden sm:block">Create</span>
      </button>
    </SectionHeader>

    <JobFilter v-model="reactiveFilter" class="mt-2" />

    <!-- Job list -->
    <ul role="list" class="space-y-4 mt-4" v-if="jobs">
      <JobListItem v-for="job in jobs" :key="job.name" :job="job" />
    </ul>

    <EmptyState
      @click="resetFilter()"
      :icon="TrashIcon"
      v-if="jobs?.length === 0 && isFilterd"
      text="Your filter does not match any records."
    />
  </Container>
</template>
