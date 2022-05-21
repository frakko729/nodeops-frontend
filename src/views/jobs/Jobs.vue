<script setup lang="ts">
import { useRouter } from "vue-router";
import Container from "@/components/Container.vue";
import { FilterIcon, PlusIcon } from "@heroicons/vue/solid";
import { ref } from "vue";
import Filter from "@/components/Filter.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import { useApi } from "@/composables/api";
import JobListItem from "@/components/JobListItem.vue";

const { get, loading, data: jobs, error } = useApi<Array<any>>("api/jobs");
const router = useRouter();

get().then(() => {
  if (jobs.value?.length === 0) {
    router.push({ name: "job-create", query: { new: "true" } });
  }
});

const onCreateJob = () => {
  router.push({ name: "job-create" });
};

const showFilter = ref(false);
const onFilter = () => {
  showFilter.value = !showFilter.value;
};
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
    <ul role="list" class="space-y-4 mt-4" v-if="jobs">
      <JobListItem v-for="job in jobs" :key="job.name" :job="job" />
    </ul>
  </Container>
</template>
