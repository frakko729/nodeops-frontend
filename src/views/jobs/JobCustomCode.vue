<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import Container from "@/components/Container.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import { TerminalIcon, PencilIcon } from "@heroicons/vue/outline";
import JavascriptEditor from "../../components/JavascriptEditor.vue";
import { useApi } from "@/composables/api";
import { useSteps } from "@/composables/steps";
import { useNotification } from "@/composables/notification";
import simpleRequestJs from "@/assets/examples/simpleRequest.js?raw";
import ChainRadioGroup from "@/components/inputs/ChainRadioGroup.vue";
import Steps from "@/components/Steps.vue";
import Listbox from "@/components/inputs/Listbox.vue";
import { useForm } from "@/composables/form";
import { useJobTypeStore } from "@/stores/jobTypeStore";
import { useRouter } from "vue-router";
import { useGeneralStore } from "@/stores/generalStore";
import Badge from "@/components/Badge.vue";
import NodeRadioGroup from "@/components/inputs/NodeRadioGroup.vue";
import NodeFilter from "@/components/filters/NodeFilter.vue";
import { useFilter } from "@/composables/filter";
import { TrashIcon } from "@heroicons/vue/solid";
import EmptyState from "@/components/EmptyState.vue";

const generalStore = useGeneralStore();
const jobTypeStore = useJobTypeStore(); // Get all job types
const { form, submitForm } = useForm(); // FormKit helper
const { showSuccess } = useNotification();
const router = useRouter();

/**
 * Reactive user input data
 */
const jobData = reactive({
  name: "",
  chain: {} as Backend.Models.Chain,
  code: simpleRequestJs,
  jobType: jobTypeStore.jobTypes[0],
  agree: false,
});

/**
 * Steps handling
 */
const { steps, nextStep, prevStep, onStep, currentStepIndex } = useSteps([
  { id: "Step 1", name: "Job details", status: "current" },
  { id: "Step 2", name: "Custom Code", status: "upcoming" },
  { id: "Step 3", name: "Deployment", status: "upcoming" },
]);

/**
 * Submiting to backend
 */
const { loading, data, error, post } = useApi("api/jobs/code");

/**
 * Reactive Filter with helpers
 */
const { reactiveFilter, parmFilter, isFilterd, resetFilter } =
  useFilter<Backend.Filters.NodeFilter>({
    sort: "id",
    chains: [],
    regions: [],
  });

const onDeploy = async () => {
  await post({ code: jobData.name });
  if (!error.value) {
    showSuccess("");
  }
};
</script>

<template>
  <Container>
    <SectionHeader title="Create with custom code" />

    <Steps :steps="steps" @step="onStep" class="mt-8 mb-10" />

    <!-- Job Detail Step Start -->
    <template v-if="currentStepIndex === 0">
      <FormKit
        type="form"
        :actions="false"
        :incomplete-message="false"
        ref="form"
        :config="{ validationVisibility: 'submit' }"
        @submit="nextStep()"
      >
        <div class="grid grid-flow-col grid-cols-3 md:gap-x-4 lg:gap-x-8">
          <!-- Chainlink Job Type Input Start -->
          <Listbox
            v-model="jobData.jobType"
            :list="jobTypeStore.jobTypes"
            class="h-12 col-span-1"
          />
          <!-- Chainlink Job Type Input End -->

          <!-- Job Name Start -->
          <FormKit
            v-model="jobData.name"
            name="jobName"
            validation="required"
            placeholder="Job name"
            outer-class="$reset col-span-2"
            inner-class="$reset h-12"
            :config="{ validationVisibility: 'submit' }"
          />
          <!-- Job Name End -->
        </div>
      </FormKit>

      <NodeRadioGroup class="mt-4" v-model="jobData.chain" :filter="parmFilter">
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
    </template>
    <!-- Job Detail Step End -->

    <!-- Code Step Start -->
    <template v-if="currentStepIndex === 1">
      <div class="hidden">
        <button class="btn btn-secondary">
          <TerminalIcon class="sm:-ml-1 sm:mr-2 h-4 w-4" /> <span>Run</span>
        </button>
      </div>
      <JavascriptEditor v-model="jobData.code" class="mt-2" />
    </template>
    <!-- Code Step End -->

    <!-- Code Step Start -->
    <template v-if="currentStepIndex === 2">
      <div class="rounded-lg bg-white overflow-hidden shadow">
        <div class="bg-white p-6">
          <div class="sm:flex sm:items-start sm:justify-between">
            <div class="sm:flex sm:space-x-5 space-y-4 sm:space-y-0">
              <div class="flex-shrink-0">
                <img
                  class="mx-auto h-16 w-16 rounded-full"
                  :src="generalStore.getImage(jobData.chain.image)"
                />
              </div>
              <div class="h-max self-start">
                <p
                  class="text-xl font-bold text-gray-900 sm:text-2xl text-center sm:text-left"
                >
                  {{ jobData.name }}
                </p>

                <div
                  class="flex space-x-2 items-center mt-2 w-max mx-auto sm:ml-0"
                >
                  <Badge
                    :text="jobData.chain.is_mainnet ? 'Mainnet' : 'Testnet'"
                  />
                  <Badge :text="jobData.jobType.name" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 hidden">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium">Your custom code</h3>
          <button class="btn btn-secondary" @click="onStep(1)">
            <PencilIcon class="sm:-ml-1 sm:mr-2 h-4 w-4" /> <span>Edit</span>
          </button>
        </div>
        <JavascriptEditor
          :disabled="true"
          height="420"
          v-model="jobData.code"
        />
      </div>

      <div class="rounded-lg bg-white overflow-hidden shadow p-6 mt-8">
        <h3 class="font-medium">Subscription</h3>
        <p class="mt-1 mb-5">
          This deployment is free to use for four weeks, and is limited to one
          job deployment per user.
        </p>

        <dl
          class="text-sm font-medium text-gray-500 space-y-6 border-t border-gray-200 pt-6"
        >
          <div class="flex justify-between">
            <dt>Cost</dt>
            <dd class="text-gray-900">Free</dd>
          </div>

          <div class="flex justify-between">
            Expiry date
            <dd class="text-gray-900">Friday, 29 July 2022</dd>
          </div>

          <div class="mt-6 flex space-x-2">
            <div class="flex items-center h-5">
              <input
                type="checkbox"
                v-model="jobData.agree"
                checked="false"
                class="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
              />
            </div>
            <label
              for="same-as-shipping"
              class="text-sm font-medium text-gray-900"
            >
              I agree to the
              <a
                href="#"
                class="text-blue-500 hover:text-blue-600 transition-colors"
                >terms and conditions</a
              ></label
            >
          </div>
        </dl>
      </div>
    </template>
    <!-- Code Step End -->

    <div class="w-full flex space-x-8 mt-8">
      <button
        @click="currentStepIndex === 0 ? router.go(-1) : prevStep()"
        type="button"
        class="disabled:opacity-50 btn btn-secondary w-full"
      >
        <span class="w-full">Back</span>
      </button>
      <button
        v-if="currentStepIndex != 2"
        @click="currentStepIndex === 0 ? submitForm() : nextStep()"
        type="button"
        class="disabled:opacity-50 btn btn-primary w-full"
      >
        <span class="w-full">Next</span>
      </button>
      <button
        v-else
        :disabled="!jobData.agree"
        @click="onDeploy()"
        type="button"
        class="disabled:opacity-50 btn btn-primary w-full"
      >
        <span class="w-full">Deploy</span>
      </button>
    </div>
  </Container>
</template>
