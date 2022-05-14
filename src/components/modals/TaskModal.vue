<script setup lang="ts">
import { reactive, ref, watch, watchEffect } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { BeakerIcon } from "@heroicons/vue/outline";
import { FormKitSchema } from "@formkit/vue";
import Listbox from "../Listbox.vue";

/**
 * Tasks boilerplate
 */
const tasks = reactive([
  {
    id: 1,
    name: "JSON Parse",
    value: "jsonparse",
    inputs: [
      {
        $formkit: "text",
        name: "path",
        label: "Path",
        help: "The keypath to extract from the http response e.g. data,0,price",
        validation: "required",
      },
    ],
  },
  {
    id: 2,
    name: "Multiply",
    type: "multiply",
    inputs: [
      {
        $formkit: "number",
        name: "times",
        label: "Times",
        help: "The value to multiply the http response with",
        validation: "required|number",
      },
    ],
  },
  {
    id: 3,
    name: "Divide",
    type: "divide",
    inputs: [
      {
        $formkit: "number",
        name: "divisor",
        label: "Divisor",
        help: "The value by which to divide the http response with",
        validation: "required|number",
      },
      {
        $formkit: "number",
        name: "precision",
        label: "Precision",
        help: "The number of decimal places to retain",
        validation: "required|number",
      },
    ],
  },
]);

/**
 * Reactive variables
 */
const selectedTask = ref(tasks[0]);
const taskForm = ref();

/**
 * Modal state handling
 */
interface Props {
  open: boolean;
  edit?: any;
}
const { open, edit } = defineProps<Props>();
const emit = defineEmits(["close", "add", "edit"]);
const close = () => {
  emit("close");
};

/**
 * Check if modal is in edit mode and pre select/fill data
 */
watchEffect(() => {
  if (edit) {
    const editParsed = JSON.parse(edit.value);

    const task = tasks.find((item: any) => item.name === edit.key);
    if (task) {
      Object.keys(editParsed).forEach((key: any) => {
        const input: any = task.inputs.find((item: any) => item.name === key);
        if (input) {
          input.value = editParsed[key];
        }
      });
    }
  }
});

/**
 * Form Handling
 */
const onConfirm = () => {
  if (taskForm.value) {
    const node = taskForm.value.node;
    node.submit();
  }
};
const onSubmit = () => {
  if (taskForm.value) {
    const node = taskForm.value.node;

    if (edit) {
      emit("edit", selectedTask.value, node.value);
    } else {
      emit("add", selectedTask.value, node.value);
    }

    close();
  }
};
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="close()">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div
          class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <!-- This element is to trick the browser into centering the modal contents. -->
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
            >&#8203;</span
          >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            >
              <div>
                <div
                  class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100"
                >
                  <BeakerIcon
                    class="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <div class="mt-3 sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-lg leading-6 font-medium text-gray-900 text-center"
                  >
                    <span v-if="edit">Edit {{ selectedTask.name }}</span>
                    <span v-else>Add a new task</span>
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500 text-center">
                      Tasks are a replacement for core adapters that is more
                      flexible. You can find out more about task and their
                      documentation
                      <a
                        class="text-blue-500 hover:underline"
                        href="https://docs.chain.link/docs/tasks/"
                        target="_blank"
                        >here</a
                      >.
                    </p>
                  </div>

                  <div class="mt-6" v-if="!edit">
                    <span
                      class="block text-sm font-medium text-gray-700 formkit-invalid:text-red-500"
                      >Task</span
                    >
                    <Listbox
                      v-model="selectedTask"
                      :list="tasks"
                      class="h-10 mt-1"
                    />
                  </div>

                  <div class="mt-5">
                    <FormKit
                      :key="selectedTask.id"
                      type="form"
                      :actions="false"
                      :incomplete-message="false"
                      ref="taskForm"
                      :config="{ validationVisibility: 'submit' }"
                      @submit="onSubmit()"
                    >
                      <FormKitSchema
                        v-if="selectedTask.inputs"
                        :schema="selectedTask.inputs"
                      />
                    </FormKit>
                  </div>
                </div>
              </div>
              <div
                class="mt-6 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
              >
                <button
                  @click="onConfirm()"
                  type="button"
                  class="btn btn-primary justify-center mt-3 sm:mt-0 sm:col-start-2"
                >
                  <span v-if="edit">Edit</span>
                  <span v-else>Add</span>
                </button>
                <button
                  type="button"
                  class="btn btn-white justify-center mt-3 sm:mt-0 sm:col-start-1 sm:text-sm"
                  @click="close()"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
