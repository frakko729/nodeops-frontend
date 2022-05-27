<script setup lang="ts">
import { TableIcon } from "@heroicons/vue/solid";
import EmptyState from "@/components/EmptyState.vue";
import CodeModal from "@/components/modals/CodeModal.vue";
import { useToggle } from "@vueuse/core";
import { ref } from "vue";
import { inputs } from "@formkit/inputs";

interface Props {
  job: any;
  runs: Array<any>;
}
const { job, runs } = defineProps<Props>();

const isToggled = ref(false);
const codeInput = ref("");

const onInput = (run: any) => {
  isToggled.value = true;

  codeInput.value = run.inputs;
};

const onOutput = (run: any) => {
  isToggled.value = true;
  codeInput.value = run.outputs;
};

const onErrors = (run: any) => {
  isToggled.value = true;
  codeInput.value = run.errors;
};
</script>

<template>
  <div
    v-if="runs.length !== 0"
    class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
  >
    <table class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="w-20"></th>
          <th
            scope="col"
            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            <a href="#" class="group inline-flex"> Run </a>
          </th>
          <th
            scope="col"
            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            <a href="#" class="group inline-flex"> Inputs </a>
          </th>
          <th
            scope="col"
            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            <a href="#" class="group inline-flex"> Outputs </a>
          </th>
          <th
            scope="col"
            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            <a href="#" class="group inline-flex"> Errors </a>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-for="(run, id) in runs" :key="id">
          <td class="whitespace-nowrap px-5">
            <span
              :class="{
                'bg-red-400': run.status == 0,
                'bg-green-400': run.status == 1,
              }"
              class="w-5 h-5 rounded-full block"
            ></span>
          </td>
          <td
            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
          >
            {{ id + 1 }}
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <button
              @click="onInput(run)"
              class="text-blue-600 hover:text-blue-900"
            >
              View
            </button>
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <button
              @click="onOutput(run)"
              class="text-blue-600 hover:text-blue-900"
            >
              View
            </button>
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <button
              @click="onErrors(run)"
              class="text-blue-600 hover:text-blue-900"
            >
              View
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <teleport to="body">
      <CodeModal
        :open="isToggled"
        :input="codeInput"
        @close="isToggled = false"
      />
    </teleport>
  </div>
  <div v-else>
    <EmptyState
      :icon="TableIcon"
      text="You will find all job runs here."
      disabled="true"
      class="hover:border-gray-300"
    />
  </div>
</template>
