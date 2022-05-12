<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon, CheckCircleIcon } from "@heroicons/vue/solid";
import Container from "@/components/Container.vue";
import Tabs from "../../components/Tabs.vue";
import { useChainStore } from "@/stores/chainStore";
import { PlusIcon, CloudIcon } from "@heroicons/vue/solid";
import KeyValueTable from "../../components/tables/KeyValueTable.vue";
import JsonOutput from "../../components/JsonOutput.vue";
import { useGeneralStore } from "@/stores/generalStore";
import { useApi } from "@/composables/api";
import TomlEditor from "@/components/TomlEditor.vue";

/**
 * Get chain data from backend
 */
const chainStore = useChainStore();
chainStore.loadChains();

/**
 * Import general store for resolving backend images
 */
const generalStore = useGeneralStore();

/**
 * Static select data
 */
const methods = [
  { id: 1, name: "GET" },
  { id: 2, name: "POST" },
];
const jobTypes = [{ id: 1, name: "Direct Request" }];

/**
 * Reactive user input data
 */
const jobData = reactive({
  jobType: jobTypes[0],
  name: "",
  url: "",
  method: methods[0],
  chain: {} as Backend.Models.Chain,
  parms: [
    {
      id: 0,
      key: "",
      value: "",
      isActive: true,
    },
  ],
  headers: [
    {
      id: 0,
      key: "",
      value: "",
      isActive: true,
    },
  ],
});

/**
 * Computed counts for tab
 * TODO don't count empty entries
 */
const parmsCount = computed((): number => jobData.parms.length);
const headersCount = computed((): number => jobData.headers.length);

/**
 * Tabs definition
 */
const tabs: Array<any> = [
  { name: "Parameters", href: "#", count: parmsCount, current: true },
  { name: "Headers", href: "#", count: headersCount, current: false },
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

const isValid = ref(true);

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
    parameters: JSON.stringify(jobData.parms),
    headers: JSON.stringify(jobData.headers),
  });

  console.log(error);
  console.log(data);
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
    parameters: JSON.stringify(jobData.parms),
    headers: JSON.stringify(jobData.headers),
  });

  tomlSpec.value = data.value;
};
</script>

<template>
  <Container>
    <div class="flex space-x-4">
      <!-- Chainlink Job Type Input Start -->
      <Listbox as="div" v-model="jobData.jobType" class="w-1/2">
        <div class="relative">
          <ListboxButton
            class="h-12 bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:border-blue-500 sm:text-sm"
          >
            <span class="block truncate">{{ jobData.jobType.name }}</span>
            <span
              class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
            >
              <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base focus:outline-none focus:border-blue-500 sm:text-sm"
            >
              <ListboxOption
                as="template"
                v-for="jobType in jobTypes"
                :key="jobType.id"
                :value="jobType"
                v-slot="{ active, selected }"
              >
                <li
                  :class="[
                    active ? 'text-white bg-blue-600' : 'text-gray-900',
                    'cursor-default select-none relative py-2 pl-3 pr-9',
                  ]"
                >
                  <span
                    :class="[
                      selected ? 'font-semibold' : 'font-normal',
                      'block truncate',
                    ]"
                  >
                    {{ jobType.name }}
                  </span>

                  <span
                    v-if="selected"
                    :class="[
                      active ? 'text-white' : 'text-blue-600',
                      'absolute inset-y-0 right-0 flex items-center pr-4',
                    ]"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
      <!-- Chainlink Job Type Input End -->

      <!-- Job Name Start -->
      <input
        class="h-12 w-1/2 px-4 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
        placeholder="Job name"
        v-model="jobData.name"
      />
      <!-- Job Name End -->
    </div>

    <div class="flex mt-4">
      <!-- Request Method Input Start -->
      <Listbox as="div" v-model="jobData.method">
        <div class="relative w-28">
          <ListboxButton
            class="h-12 bg-white relative w-full border border-gray-300 rounded-l-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:border-blue-500 sm:text-sm"
          >
            <span class="block truncate">{{ jobData.method.name }}</span>
            <span
              class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
            >
              <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base focus:outline-none focus:border-blue-500 sm:text-sm"
            >
              <ListboxOption
                as="template"
                v-for="method in methods"
                :key="method.id"
                :value="method"
                v-slot="{ active, selected }"
              >
                <li
                  :class="[
                    active ? 'text-white bg-blue-600' : 'text-gray-900',
                    'cursor-default select-none relative py-2 pl-3 pr-9',
                  ]"
                >
                  <span
                    :class="[
                      selected ? 'font-semibold' : 'font-normal',
                      'block truncate',
                    ]"
                  >
                    {{ method.name }}
                  </span>

                  <span
                    v-if="selected"
                    :class="[
                      active ? 'text-white' : 'text-blue-600',
                      'absolute inset-y-0 right-0 flex items-center pr-4',
                    ]"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
      <!-- Request Method Input End -->

      <!-- Request Url Start -->
      <input
        class="h-12 w-full px-4 rounded-r-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
        placeholder="https://external-api.dev/api/example"
        v-model="jobData.url"
      />
      <!-- Request Url End -->
    </div>

    <!-- Tabs Start -->
    <Tabs :tabs="tabs">
      <template #header="{ activeTab }">
        <!-- Parameters Tab Header Start -->
        <button
          v-if="activeTab?.name === 'Parameters'"
          @click="addKeyValuePair(jobData.parms)"
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon class="sm:-ml-1 sm:mr-2 h-5 w-5" aria-hidden="true" />
          <span class="hidden sm:block">Add</span>
        </button>
        <!-- Parameters Tab Header End -->

        <!-- Headers Tab Header Start -->
        <button
          v-if="activeTab?.name === 'Headers'"
          @click="addKeyValuePair(jobData.headers)"
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon class="sm:-ml-1 sm:mr-2 h-5 w-5" aria-hidden="true" />
          <span class="hidden sm:block">Add</span>
        </button>
        <!-- Headers Tab Header End -->

        <!-- Test Tab Header Start -->
        <button
          v-if="activeTab?.name === 'Test'"
          @click="addKeyValuePair(jobData.headers)"
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <CloudIcon class="sm:-ml-1 sm:mr-2 h-5 w-5" aria-hidden="true" />
          <span class="hidden sm:block">Test</span>
        </button>
        <!-- Test Tab Header End -->
      </template>

      <template #default="{ activeTab }">
        <!-- Parameters Tab Start -->
        <div v-if="activeTab?.name === 'Parameters'">
          <KeyValueTable v-model="jobData.parms" />

          <span class="block mt-3 text-gray-600"
            >These parameters will be availiable inside solidity, check docs for
            more informations.</span
          >
        </div>
        <!-- Parameters Tab End -->

        <!-- Headers Tab Start -->
        <div v-if="activeTab?.name === 'Headers'">
          <KeyValueTable v-model="jobData.headers" />
        </div>
        <!-- Headers Tab End -->

        <!-- Test Tab Start -->
        <div v-if="activeTab?.name === 'Test'"><JsonOutput /></div>
        <!-- Test Tab End -->
      </template>
    </Tabs>
    <!-- Tabs End -->

    <div class="mt-8">
      <!-- Chain Input Start -->
      <RadioGroup v-model="jobData.chain">
        <RadioGroupLabel class="text-base font-medium text-gray-900">
          Select a chain
        </RadioGroupLabel>

        <div class="mt-4 grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3">
          <RadioGroupOption
            as="template"
            v-for="chain in chainStore.chains"
            :key="chain.id"
            :value="chain"
            v-slot="{ checked, active }"
          >
            <div
              :class="[
                checked ? 'border-transparent' : 'border-gray-200',
                active ? 'ring-2 ring-blue-500' : '',
                'relative  bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none',
              ]"
            >
              <div class="flex-1 flex">
                <div class="flex flex-col">
                  <RadioGroupLabel
                    as="div"
                    class="block text-sm font-medium text-gray-900"
                  >
                    <img
                      :src="generalStore.getImage(chain.image)"
                      class="block w-12 h-12 sm:h-16 sm:w-16"
                    />

                    <span class="block mt-4 text-gray-700">{{
                      chain.name
                    }}</span>
                  </RadioGroupLabel>

                  <RadioGroupDescription
                    as="span"
                    :class="{
                      'bg-blue-100 text-blue-800': chain.is_mainnet,
                      'bg-red-100 text-red-800': !chain.is_mainnet,
                    }"
                    class="mt-2 w-max inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    <span v-if="chain.is_mainnet">Mainnet</span>
                    <span v-else>Testnet</span>
                  </RadioGroupDescription>
                </div>
              </div>
              <CheckCircleIcon
                :class="[
                  !checked ? 'invisible' : '',
                  'h-5 w-5 text-indigo-600',
                ]"
                aria-hidden="true"
              />
              <div
                :class="[
                  active ? 'border' : 'border-2',
                  checked ? 'border-blue-500' : 'border-transparent',
                  'absolute -inset-px rounded-lg pointer-events-none',
                ]"
                aria-hidden="true"
              />
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
      <!-- Chain Input End -->
    </div>

    <div class="w-full mt-8">
      <div class="flex items-center justify-between">
        <p class="text-lg font-medium text-gray-900">TOML Spec</p>
        <button
          @click="getTomlSpec()"
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span class="block">Generate</span>
        </button>
      </div>
      <TomlEditor class="mt-4" :input="tomlSpec" />
    </div>

    <div class="w-full mt-8">
      <button
        @click="onSubmit()"
        :disabled="!isValid"
        type="button"
        :class="{
          'hover:bg-blue-600': isValid,
        }"
        class="disabled:opacity-50 w-full h-12 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <span class="w-full">Create Job</span>
      </button>
    </div>
  </Container>
</template>
