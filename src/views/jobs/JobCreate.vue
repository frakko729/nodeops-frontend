<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { PlusIcon, CloudIcon } from "@heroicons/vue/solid";
import { CloudIcon as CloudOutlineIcon } from "@heroicons/vue/outline";
import Container from "@/components/Container.vue";
import Tabs from "../../components/Tabs.vue";
import KeyValueTable from "../../components/tables/KeyValueTable.vue";
import JsonOutput from "../../components/JsonOutput.vue";
import { useApi } from "@/composables/api";
import TomlEditor from "@/components/TomlEditor.vue";
import TaskModal from "../../components/modals/TaskModal.vue";
import EmptyState from "@/components/EmptyState.vue";
import ChainRadioGroup from "@/components/ChainRadioGroup.vue";
import Listbox from "@/components/Listbox.vue";
import { useNotification } from "@/composables/notification";

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

/**
 * TODO Test the request
 */
const testResult = ref();
const testRequest = () => {
  testResult.value = "test";
};

/**
 * Computed counts for tab
 * TODO don't count empty entries
 */
const parmsStaticCount = computed((): number => jobData.staticParms.length);
const parmsDynamicCount = computed((): number => jobData.dynamicParms.length);
const tasksCount = computed((): number => jobData.tasks.length);
const headersCount = computed((): number => jobData.headers.length);

/**
 * Tabs definition
 */
const tabs: Array<any> = [
  {
    name: "Static Parameters",
    href: "#",
    count: parmsStaticCount,

    current: true,
  },
  {
    name: "Dynamic Parameters",
    href: "#",
    count: parmsDynamicCount,
    current: false,
  },
  { name: "Headers", href: "#", count: headersCount, current: false },
  { name: "Tasks", href: "#", count: tasksCount, current: false },
  { name: "Test", href: "#", current: false },
];

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
const onSubmit = async () => {
  const { post, data, loading, error } = useApi("api/jobs");
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
  }
};

/**
 * Get toml spec from input
 */
const tomlSpec = ref();
const getTomlSpec = async () => {
  const { post, data, loading, error } = useApi("api/jobs/toml");
  await post({
    name: jobData.name,
    method: jobData.method.name,
    url: jobData.url,
    job_type_id: jobData.jobType.id,
    chain_id: jobData.chain.id,
    parameters: JSON.stringify(jobData.staticParms),
    headers: JSON.stringify(jobData.headers),
  });

  tomlSpec.value = data.value;
};

const isTaskModalOpen = ref(false);
const taskToEdit = ref();

const openTaskModal = () => {
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
    <Tabs :tabs="tabs">
      <template #header="{ activeTab }">
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

      <template #default="{ activeTab }">
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

    <div class="w-full mt-8 hidden">
      <div class="flex items-center justify-between">
        <p class="text-lg font-medium text-gray-900">TOML Spec</p>
        <button @click="getTomlSpec()" type="button" class="btn btn-primary">
          <span class="block">Generate</span>
        </button>
      </div>
      <TomlEditor class="mt-4" :input="tomlSpec" />
    </div>

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
