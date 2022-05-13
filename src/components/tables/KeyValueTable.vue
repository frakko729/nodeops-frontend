<!-- This example requires Tailwind CSS v2.0+ -->
<script setup lang="ts">
import TableActions from "./TableActions.vue";
import Toggle from "../Toggle.vue";

interface KeyValue {
  id: number;
  key?: string;
  value?: string | number;
  isActive: boolean;
}

interface Props {
  disableInputs?: boolean;
  keyLabel?: string;
  valueLabel?: string;
  modelValue: Array<KeyValue>;
  editCallback?: (parm: KeyValue) => any;
  duplicateCallback?: (parm: KeyValue) => any;
  removeCallback?: (parm: KeyValue) => any;
  hideActions?: Array<string>;
}

const {
  modelValue,
  disableInputs,
  keyLabel = "Key",
  valueLabel = "Value",
  hideActions,
  editCallback,
  duplicateCallback,
  removeCallback,
} = defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

/**
 * Click on duplicate button
 */
const duplicateParm = (parm: KeyValue) => {
  const item = modelValue.find((item: KeyValue) => item.id === parm.id);

  if (item) {
    item.id = modelValue.length;
    modelValue.push(item);
  }

  if (duplicateCallback) {
    duplicateCallback(parm);
  }
};

/**
 * Click on edit button
 */
const editParm = (parm: KeyValue) => {
  if (editCallback) {
    editCallback(parm);
  }
};

/**
 * Click on remove button
 */
const removeParm = (parm: KeyValue) => {
  const index = modelValue.findIndex((item: KeyValue) => item.id === parm.id);

  if (index !== -1) {
    modelValue.splice(index, 1);
  }

  if (removeCallback) {
    removeCallback(parm);
  }
};
</script>

<template>
  <div>
    <div class="overflow border rounded-lg shadow-sm border-gray-200">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr class="divide-x divide-gray-200">
            <th
              scope="col"
              class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              {{ keyLabel }}
            </th>
            <th
              scope="col"
              class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              {{ valueLabel }}
            </th>

            <th
              scope="col"
              class="px-4 py-3.5 text-left text-sm font-semibold w-16"
            ></th>

            <th
              scope="col"
              class="px-4 py-3.5 text-left text-sm font-semibold"
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
                :disabled="disableInputs"
                class="h-10 w-full bg-transparent border-transparent focus:outline-none focus:border-transparent rounded"
                :placeholder="keyLabel"
                v-model="parm.key"
              />
            </td>
            <td class="whitespace-nowrap p-2 pl-4 text-sm text-gray-500">
              <input
                :disabled="disableInputs"
                class="h-10 w-full bg-transparent border-transparent focus:outline-none focus:border-transparent rounded"
                :placeholder="valueLabel"
                v-model="parm.value"
              />
            </td>

            <td class="whitespace-nowrap px-3 w-16">
              <Toggle v-model="parm.isActive" />
            </td>

            <td class="whitespace-nowrap pl-[18px] w-16">
              <TableActions
                :hideActions="hideActions"
                @remove="removeParm(parm)"
                @duplicate="duplicateParm(parm)"
                @edit="editParm(parm)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
