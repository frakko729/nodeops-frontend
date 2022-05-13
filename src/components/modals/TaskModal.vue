<script setup lang="ts">
import { ref, watch } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { BeakerIcon } from "@heroicons/vue/outline";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import { FormKitSchema } from "@formkit/vue";

/**
 * Tasks boilerplate
 */
const tasks = [
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
];

/**
 * Reactive variables
 */
const selectedTask = ref(tasks[0]);
const dynamicForm = ref();

/**
 * Modal state handling
 */
interface Props {
  open: boolean;
}
const { open } = defineProps<Props>();
const emit = defineEmits(["close", "add"]);
const close = () => {
  emit("close");
};

/**
 * Form Handling
 */
const onAdd = () => {
  if (dynamicForm.value) {
    const node = dynamicForm.value.node;
    node.submit();
  }
};
const onSubmit = () => {
  if (dynamicForm.value) {
    const node = dynamicForm.value.node;
    emit("add", selectedTask.value, node.value);
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
                    Add a new task
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

                  <div class="mt-4">
                    <Listbox as="div" v-model="selectedTask">
                      <ListboxLabel
                        class="block text-left text-sm font-medium text-gray-700"
                      >
                        Task
                      </ListboxLabel>
                      <div class="mt-1 relative">
                        <ListboxButton
                          class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 h-[42px] text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <span class="block truncate">{{
                            selectedTask.name
                          }}</span>
                          <span
                            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                          >
                            <SelectorIcon
                              class="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition ease-in duration-100"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="absolute z-20 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              as="template"
                              v-for="task in tasks"
                              :key="task.id"
                              :value="task"
                              v-slot="{ active, selected }"
                            >
                              <li
                                :class="[
                                  active
                                    ? 'text-white bg-blue-600'
                                    : 'text-gray-900',
                                  'cursor-default select-none relative py-2 pl-3 pr-9',
                                ]"
                              >
                                <span
                                  :class="[
                                    selected ? 'font-semibold' : 'font-normal',
                                    'block truncate',
                                  ]"
                                >
                                  {{ task.name }}
                                </span>

                                <span
                                  v-if="selected"
                                  :class="[
                                    active ? 'text-white' : 'text-blue-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                  ]"
                                >
                                  <CheckIcon
                                    class="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              </li>
                            </ListboxOption>
                          </ListboxOptions>
                        </transition>
                      </div>
                    </Listbox>
                  </div>

                  <div class="mt-5">
                    <FormKit
                      :key="selectedTask.id"
                      type="form"
                      :actions="false"
                      :incomplete-message="false"
                      ref="dynamicForm"
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
                  @click="onAdd()"
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                >
                  Add
                </button>
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
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
