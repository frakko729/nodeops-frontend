<!-- This example requires Tailwind CSS v2.0+ -->
<script setup lang="ts">
import {
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/vue/outline";

interface KeyValue {
  id: number;
  key?: string;
  value?: string | number;
  isActive: boolean;
}

interface Props {
  modelValue: Array<KeyValue>;
}

const { modelValue } = defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

const toggleParm = (parm: KeyValue) => {
  parm.isActive = !parm.isActive;
};

const deleteParm = (parm: KeyValue) => {
  const index = modelValue.findIndex((item: KeyValue) => item.id === parm.id);

  if (index !== -1) {
    modelValue.splice(index, 1);
  }
};
</script>

<template>
  <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
      <div
        class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
      >
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr class="divide-x divide-gray-200">
              <th
                scope="col"
                class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Key
              </th>
              <th
                scope="col"
                class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Value
              </th>

              <th
                scope="col"
                class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
              ></th>

              <th
                scope="col"
                class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6"
              ></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr
              v-for="parm in modelValue"
              :key="parm.id"
              class="divide-x divide-gray-200"
            >
              <td
                class="whitespace-nowrap py-2 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6"
              >
                <input
                  class="h-10 w-full bg-transparent border-transparent focus:outline-none focus:border-transparent rounded"
                  placeholder="Key"
                  v-model="parm.key"
                />
              </td>
              <td class="whitespace-nowrap p-2 pl-4 text-sm text-gray-500">
                <input
                  class="h-10 w-full bg-transparent border-transparent focus:outline-none focus:border-transparent rounded"
                  placeholder="Value"
                  v-model="parm.value"
                />
              </td>

              <td class="whitespace-nowrap p-2 text-sm text-gray-500 w-16">
                <button
                  @click="toggleParm(parm)"
                  :class="{
                    'text-green-500 hover:text-gray-500': parm.isActive,
                    'text-gray-500 hover:text-green-500': !parm.isActive,
                  }"
                  class="w-full h-full flex items-center justify-center transition-colors"
                >
                  <CheckCircleIcon class="w-6 h-6" />
                </button>
              </td>

              <td
                class="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6 w-16"
              >
                <button
                  @click="deleteParm(parm)"
                  class="w-full h-full flex items-center justify-center transition-colors text-red-500 hover:text-red-600"
                >
                  <TrashIcon class="w-6 h-6" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
