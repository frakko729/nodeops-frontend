<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from "vue";
import { PlusIcon, CloudIcon, TrashIcon } from "@heroicons/vue/solid";
import { CloudIcon as CloudOutlineIcon } from "@heroicons/vue/outline";
import Tabs from "../../components/Tabs.vue";
import Container from "../../components/Container.vue";
import KeyValueTable from "../../components/tables/KeyValueTable.vue";
import JsonOutput from "../../components/JsonOutput.vue";
import { useApi } from "@/composables/api";
import TaskModal from "../../components/modals/TaskModal.vue";
import EmptyState from "@/components/EmptyState.vue";
import Listbox from "@/components/inputs/Listbox.vue";
import { useNotification } from "@/composables/notification";
import { useRoute, useRouter } from "vue-router";
import { useTabs } from "@/composables/tabs";
import { useUrl } from "@/composables/url";
import Alert from "../../components/Alert.vue";
import { useFilter } from "@/composables/filter";
import NodeRadioGroup from "@/components/inputs/NodeRadioGroup.vue";
import NodeFilter from "@/components/filters/NodeFilter.vue";
import { Parameter } from "@/interfaces/Parameter";
import { Job } from "@/interfaces/backend/models/Job";
import { Node } from "@/interfaces/backend/models/Node";
import { NodeFilter as NodeFilterI } from "@/interfaces/backend/filters/NodeFilter";
import { useJobTypeStore } from "@/stores/jobTypeStore";

/**
 * Static select data
 */
const methods = [
  { id: 1, name: "GET" },
  { id: 2, name: "POST" },
];

const jobTypeStore = useJobTypeStore();

/**
 * Reactive user input data
 */
const jobData = reactive({
  jobType: jobTypeStore.jobTypes[0],
  name: "",
  url: "",
  method: methods[0],
  node: {} as Node,
  dynamicParms: [] as Parameter[],
  staticParms: [] as Parameter[],
  tasks: [] as Parameter[],
  headers: [] as Parameter[],
});

const url = ref<string>("");
const route = useRoute();
const jobId = ref();
const { get, data: job } = useApi<Job>(url);

/**
 * Load data from backend if in edit mode
 */
watchEffect(() => {
  if (route.params) {
    jobId.value = route.params.jobId;
    if (jobId.value) {
      url.value = `api/jobs/${jobId.value}`;

      get().then(() => {
        if (job.value) {
          jobData.name = job.value.name;
          jobData.url = job.value.url;

          if (job.value?.deployments?.[0].node) {
            jobData.node = job.value.deployments[0].node;
          }
          if (job.value.dynamicParameters) {
            jobData.dynamicParms = job.value.dynamicParameters;
          }
          if (job.value.headers) {
            jobData.headers = job.value.headers;
          }
          if (job.value.staticParameters) {
            jobData.staticParms = job.value.staticParameters;
          }
          if (job.value.tasks) {
            jobData.tasks = job.value.tasks;
          }
        }
      });
    }
  }
});

/**
 * New user message
 */
const isNewUser = ref(false);
watchEffect(() => {
  if (route.query && route.query.new) {
    isNewUser.value = true;
  }
});

/**
 * TODO Test the request
 */
const testResult = ref();
const testRequest = async () => {
  const { post, put, data, loading, error } = useApi<any>("api/jobs/ea");

  const payload = {
    name: "test",
    method: jobData.method.name,
    url: jobData.url,
    job_type_id: jobData.jobType.id,
    node_id: 1,
    static_parameters: JSON.stringify(jobData.staticParms),
    dynamic_parameters: JSON.stringify(jobData.dynamicParms),
    tasks: JSON.stringify(jobData.tasks),
    headers: JSON.stringify(jobData.headers),
  };

  await post(payload);
  testResult.value = JSON.stringify(data.value);
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
const addKeyValuePair = (appendTo: Array<any>, key?: any, value?: any) => {
  let id = 0;

  if (appendTo.length !== 0) {
    id = appendTo[appendTo.length - 1].id + 1;
  }
  appendTo.push({
    id: id,
    key: key || "",
    value: value || "",
    isActive: true,
  });
};

/**
 * Detect if url has query parms and emit them to static parms
 */
const { getJsonFromUrl } = useUrl();

watch(
  () => jobData.url,
  () => {
    const parms = getJsonFromUrl(jobData.url);

    if (typeof parms === "object" && parms !== null) {
      Object.entries(parms).forEach((parm) => {
        const [key, value] = parm;
        addKeyValuePair(jobData.staticParms, key, value);
      });

      jobData.url = jobData.url.split("?")[0];
    }
  }
);

const dynamicForm = ref();

const validateForm = () => {
  if (dynamicForm.value) {
    const node = dynamicForm.value.node;
    return node.submit();
  }
};

/**
 * Send data to backend
 */
const router = useRouter();
const onSubmit = async () => {
  const url = ref("api/jobs");

  const { post, put, data, loading, error } = useApi<any>(url);

  const payload = {
    name: jobData.name,
    method: jobData.method.name,
    url: jobData.url,
    job_type_id: jobData.jobType.id,
    node_id: jobData.node.id,
    chain_id: jobData.node?.chains?.[0].id,
    static_parameters: JSON.stringify(jobData.staticParms),
    dynamic_parameters: JSON.stringify(jobData.dynamicParms),
    tasks: JSON.stringify(jobData.tasks),
    headers: JSON.stringify(jobData.headers),
  };

  if (!jobId.value) {
    try {
      await post(payload);
    } catch (err) {}

    if (data.value && !error.value) {
      const { showSuccess } = useNotification();
      showSuccess("Your job has been created successfully.");
      router.push({ name: "job-detail", params: { jobId: data.value.id } });
    }
  } else {
    try {
      url.value = `api/jobs/${jobId.value}`;
      await put(payload);
    } catch (err) {}

    if (data.value && !error.value) {
      const { showSuccess } = useNotification();
      showSuccess("Your job has been updated successfully.");
      router.push({ name: "job-detail", params: { jobId: data.value.id } });
    }
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

/**
 * Reactive Filter with helpers
 */
const { reactiveFilter, parmFilter, isFilterd, resetFilter } =
  useFilter<NodeFilterI>({
    sort: "id",
    chains: [],
    regions: [],
  });
</script>

<template>
  <Container>
    <Alert
      text="You don't have any jobs, create your first one in just a few clicks."
      v-if="isNewUser"
      class="mb-4"
    />

    <FormKit
      id="form"
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
          :list="jobTypeStore.jobTypes"
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
          name="url"
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
          @click="testRequest()"
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
          <JsonOutput v-if="testResult" :input="testResult" />
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

    <NodeRadioGroup class="mt-8" v-model="jobData.node" :filter="parmFilter">
      <template v-slot:header>
        <NodeFilter v-model="reactiveFilter"
      /></template>

      <template v-slot:empty>
        <EmptyState
          @click="resetFilter()"
          :icon="TrashIcon"
          v-if="isFilterd"
          text="Your filter does not match any records."
        />
      </template>
    </NodeRadioGroup>

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
