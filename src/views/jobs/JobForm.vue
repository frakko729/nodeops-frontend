<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from "vue";
import { PlusIcon, CloudIcon } from "@heroicons/vue/solid";
import { CloudIcon as CloudOutlineIcon } from "@heroicons/vue/outline";
import Container from "@/components/Container.vue";
import Tabs from "../../components/Tabs.vue";
import KeyValueTable from "../../components/tables/KeyValueTable.vue";
import JsonOutput from "../../components/JsonOutput.vue";
import { useApi } from "@/composables/api";
import TaskModal from "../../components/modals/TaskModal.vue";
import EmptyState from "@/components/EmptyState.vue";
import ChainRadioGroup from "@/components/ChainRadioGroup.vue";
import Listbox from "@/components/Listbox.vue";
import { useNotification } from "@/composables/notification";
import { useRoute, useRouter } from "vue-router";
import { useTabs } from "@/composables/tabs";

/**
 * Static select data
 */
const methods = [
  { id: 1, name: "GET" },
  { id: 2, name: "POST" },
];
const jobTypes = [{ id: 1, name: "Direct Request" }];

interface Parms {
  id: number;
  key: string;
  value: string;
  isActive: boolean;
}

/**
 * Reactive user input data
 */
const jobData = reactive({
  jobType: jobTypes[0],
  name: "",
  url: "",
  method: methods[0],
  chain: {} as Backend.Models.Chain,
  dynamicParms: [] as Array<Parms>,
  staticParms: [] as Array<Parms>,
  tasks: [] as Array<Parms>,
  headers: [] as Array<Parms>,
});

const route = useRoute();
const jobId = ref();
const {
  get,
  loading,
  data: job,
  overrideEndpoint,
  error,
} = useApi<any>("api/jobs/");

const getApiData = async () => {
  get().then(() => {
    console.log(job.value);
    jobData.name = job.value.name;
    jobData.url = job.value.url;
    jobData.chain = job.value.chain;
    jobData.dynamicParms = JSON.parse(job.value.dynamic_parameters);
    jobData.headers = JSON.parse(job.value.headers);
    jobData.staticParms = JSON.parse(job.value.static_parameters);
    jobData.tasks = JSON.parse(job.value.tasks);
  });
};

watchEffect(() => {
  if (route.params) {
    jobId.value = route.params.jobId;
    if (jobId.value) {
      overrideEndpoint("api/jobs/" + jobId.value);
      getApiData();
    }
  }
});

/**
 * TODO Test the request
 */
const testResult = ref();
const testRequest = () => {
  testResult.value = "test";
};

/**
 * Computed counts for tab
 */
const parmsStaticCount = computed((): number => jobData.staticParms.length);
const parmsDynamicCount = computed((): number => jobData.dynamicParms.length);
const tasksCount = computed((): number => jobData.tasks.length);
const headersCount = computed((): number => jobData.headers.length);

/**
 * Tabs definition
 */
const { tabs, activeTab } = useTabs([
  {
    name: "Static Parameters",
    count: parmsStaticCount,
    current: true,
  },
  {
    name: "Dynamic Parameters",
    count: parmsDynamicCount,
    current: false,
  },
  { name: "Headers", count: headersCount, current: false },
  { name: "Tasks", count: tasksCount, current: false },
  { name: "Test", current: false },
]);

/**
 * Adds new entry for parms or headers
 *
 * @param appendTo
 */
const addKeyValuePair = (appendTo: Array<any>) => {
  let id = 0;

  if (appendTo.length !== 0) {
    id = appendTo[appendTo.length - 1].id + 1;
  }
  appendTo.push({
    id: id,
    key: "",
    value: "",
    isActive: true,
  });
};

const dynamicForm = ref();

const validateForm = () => {
  if (dynamicForm.value) {
    const node = dynamicForm.value.node;
    node.submit();
  }
};

/**
 * Send data to backend
 */
const router = useRouter();
const onSubmit = async () => {
  const { post, data, loading, error } = useApi<any>("api/jobs");
  await post({
    name: jobData.name,
    method: jobData.method.name,
    url: jobData.url,
    job_type_id: jobData.jobType.id,
    chain_id: jobData.chain.id,
    static_parameters: JSON.stringify(jobData.staticParms),
    dynamic_parameters: JSON.stringify(jobData.dynamicParms),
    tasks: JSON.stringify(jobData.tasks),
    headers: JSON.stringify(jobData.headers),
  });

  if (data.value && !error.value) {
    const { showSuccess } = useNotification();
    showSuccess("Your job has been created successfully.");
    router.push({ name: "job-detail", params: { jobId: data.value.id } });
  }
};

const isTaskModalOpen = ref(false);
const taskToEdit = ref();

const openTaskModal = () => {
  taskToEdit.value = null;
  isTaskModalOpen.value = true;
};

const onTaskModalClose = () => {
  isTaskModalOpen.value = false;
};
const onTaskModalAdd = (task: any, values: any) => {
  let id = 0;
  if (jobData.tasks.length !== 0) {
    id = jobData.tasks[jobData.tasks.length - 1].id + 1;
  }

  jobData.tasks.push({
    id: id,
    key: task.name,
    value: JSON.stringify(values, null, "\t"),
    isActive: true,
  });
};

const onTaskModalEdit = (task: any, values: any) => {
  const taskEdit = jobData.tasks.find(
    (item: any) => item.id === taskToEdit.value.id
  );
  if (taskEdit) {
    taskEdit.value = JSON.stringify(values, null, "\t");
  }
};

const onTaskEdit = (task: any) => {
  isTaskModalOpen.value = true;
  taskToEdit.value = task;
};
</script>

<template>
  <Container>
    <FormKit
      type="form"
      :actions="false"
      :incomplete-message="false"
      ref="dynamicForm"
      :config="{ validationVisibility: 'submit' }"
      @submit="onSubmit()"
    >
      <div class="flex space-x-4">
        <!-- Chainlink Job Type Input Start -->
        <Listbox
          v-model="jobData.jobType"
          :list="jobTypes"
          class="w-1/2 h-12"
        />
        <!-- Chainlink Job Type Input End -->

        <!-- Job Name Start -->
        <FormKit
          v-model="jobData.name"
          name="jobName"
          validation="required"
          placeholder="Job name"
          outer-class="$reset w-full"
          inner-class="$reset h-12"
          :config="{ validationVisibility: 'submit' }"
        />
        <!-- Job Name End -->
      </div>

      <div class="flex space-x-4 mt-4">
        <!-- Request Method Input Start -->
        <Listbox v-model="jobData.method" :list="methods" class="w-28 h-12" />
        <!-- Request Method Input End -->

        <!-- Request Url Start -->

        <FormKit
          v-model="jobData.url"
          name="URL"
          validation="required|url"
          placeholder="https://external-api.dev/api/example"
          outer-class="$reset w-full"
          inner-class="$reset h-12"
          :config="{ validationVisibility: 'submit' }"
        />

        <!-- Request Url End -->
      </div>
    </FormKit>

    <!-- Tabs Start -->
    <Tabs v-model="tabs">
      <template #header>
        <!-- Static Parameters Tab Header Start -->
        <button
          v-if="activeTab?.name === 'Static Parameters'"
          @click="addKeyValuePair(jobData.staticParms)"
          type="button"
          class="btn btn-primary"
        >
          <PlusIcon class="sm:-ml-1 sm:mr-2 h-5 w-5" aria-hidden="true" />
          <span class="hidden sm:block">Add</span>
        </button>
        <!-- Static Parameters Tab Header End -->

        <!-- Dynamic Parameters Tab Header Start -->
        <button
          v-if="activeTab?.name === 'Dynamic Parameters'"
          @click="addKeyValuePair(jobData.dynamicParms)"
          type="button"
          class="btn btn-primary"
        >
          <PlusIcon class="sm:-ml-1 sm:mr-2 h-5 w-5" aria-hidden="true" />
          <span class="hidden sm:block">Add</span>
        </button>
        <!-- Dynamic Parameters Tab Header End -->

        <!-- Headers Tab Header Start -->
        <button
          v-if="activeTab?.name === 'Headers'"
          @click="addKeyValuePair(jobData.headers)"
          type="button"
          class="btn btn-primary"
        >
          <PlusIcon class="sm:-ml-1 sm:mr-2 h-5 w-5" aria-hidden="true" />
          <span class="hidden sm:block">Add</span>
        </button>
        <!-- Headers Tab Header End -->

        <!-- Tasks Tab Header Start -->
        <button
          v-if="activeTab?.name === 'Tasks'"
          @click="openTaskModal()"
          type="button"
          class="btn btn-primary"
        >
          <PlusIcon class="sm:-ml-1 sm:mr-2 h-5 w-5" aria-hidden="true" />
          <span class="hidden sm:block">Add</span>
        </button>
        <!-- Tasks Tab Header End -->

        <!-- Test Tab Header Start -->
        <button
          v-if="activeTab?.name === 'Test'"
          @click="addKeyValuePair(jobData.headers)"
          type="button"
          class="btn btn-primary"
        >
          <CloudIcon class="sm:-ml-1 sm:mr-2 h-5 w-5" aria-hidden="true" />
          <span class="hidden sm:block">Test</span>
        </button>
        <!-- Test Tab Header End -->
      </template>

      <template #default>
        <!-- Static Parameters Tab Start -->
        <div v-if="activeTab?.name === 'Static Parameters'">
          <KeyValueTable
            v-model="jobData.staticParms"
            v-if="jobData.staticParms.length != 0"
            :hide-actions="['edit']"
          />
          <EmptyState
            v-else
            text="Add static parameters to the request"
            @click="addKeyValuePair(jobData.staticParms)"
          />
        </div>
        <!-- Static Parameters Tab End -->

        <!-- Dynamic Parameters Tab Start -->
        <div v-if="activeTab?.name === 'Dynamic Parameters'">
          <KeyValueTable
            v-model="jobData.dynamicParms"
            v-if="jobData.dynamicParms.length != 0"
            value-label="Mapping"
            :hide-actions="['edit']"
          />
          <EmptyState
            v-else
            text="Add dynamic parameters to the request"
            @click="addKeyValuePair(jobData.dynamicParms)"
          />
        </div>
        <!-- Dynamic Parameters Tab End -->

        <!-- Tasks Tab Start -->
        <div v-if="activeTab?.name === 'Tasks'">
          <KeyValueTable
            key-label="Task"
            :editCallback="onTaskEdit"
            :disable-inputs="true"
            v-model="jobData.tasks"
            v-if="jobData.tasks.length != 0"
          />

          <EmptyState
            v-else
            text="Add tasks into the job pipline"
            @click="openTaskModal()"
          />
        </div>
        <!-- Tasks Tab End -->

        <!-- Headers Tab Start -->
        <div v-if="activeTab?.name === 'Headers'">
          <KeyValueTable
            v-model="jobData.headers"
            v-if="jobData.headers.length != 0"
            :hide-actions="['edit']"
          />
          <EmptyState
            v-else
            text="Add headers to the request"
            @click="addKeyValuePair(jobData.headers)"
          />
        </div>
        <!-- Headers Tab End -->

        <!-- Test Tab Start -->
        <div v-if="activeTab?.name === 'Test'">
          <JsonOutput v-if="testResult" />
          <EmptyState
            :icon="CloudOutlineIcon"
            v-else
            text="Test the result of the request"
            @click="testRequest()"
          />
        </div>
        <!-- Test Tab End -->
      </template>
    </Tabs>
    <!-- Tabs End -->

    <!-- Chain Input Start -->
    <ChainRadioGroup class="mt-8" v-model="jobData.chain" />
    <!-- Chain Input End -->

    <div class="w-full mt-8">
      <button
        @click="validateForm()"
        type="button"
        class="disabled:opacity-50 btn btn-primary w-full"
      >
        <span class="w-full">Deploy Job</span>
      </button>
    </div>

    <teleport to="body">
      <TaskModal
        :open="isTaskModalOpen"
        :edit="taskToEdit"
        @close="onTaskModalClose()"
        @add="onTaskModalAdd"
        @edit="onTaskModalEdit"
      />
    </teleport>
  </Container>
</template>
