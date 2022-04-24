<script setup lang="ts">
import { useUIStore } from "@/stores/uiStore";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/outline";
import {
  ChartBarIcon,
  CogIcon,
  DatabaseIcon,
  FolderIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/vue/outline";
import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

const navigation: Array<any> = reactive([
  { name: "Dashboard", icon: HomeIcon, to: "dashboard", current: false },
  { name: "Jobs", icon: DatabaseIcon, to: "jobs", current: false },
  { name: "Projects", icon: FolderIcon, to: "projects", current: false },
  { name: "Reports", icon: ChartBarIcon, to: "reports", current: false },
]);
const secondaryNavigation: Array<any> = reactive([
  { name: "Settings", to: "settings", icon: CogIcon, current: false },
  { name: "Help", to: "", icon: QuestionMarkCircleIcon, current: false },
]);

const onNavigationChange = (array: Array<any>, newVal: any, oldVal: any) => {
  if (oldVal) {
    const found = array.find((item) => item.to === oldVal);
    if (found) {
      found.current = false;
    }
  }
  if (newVal) {
    const found2 = array.find((item) => item.to === newVal);
    if (found2) {
      found2.current = true;
    }
  }
};

const route = useRoute();
watch(
  () => route.name,
  (newVal, oldVal) => {
    onNavigationChange(navigation, newVal, oldVal);
    onNavigationChange(secondaryNavigation, newVal, oldVal);
  }
);

const uiStore = useUIStore();
</script>

<template>
  <div>
    <TransitionRoot as="template" :show="uiStore.isMobileNavigation">
      <Dialog
        as="div"
        class="fixed inset-0 flex z-40 lg:hidden"
        @close="uiStore.toggleMobileNavigation()"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white"
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="uiStore.toggleMobileNavigation()"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex items-center flex-shrink-0 px-4 space-x-3">
              <svg
                class="h-8"
                viewBox="0 0 20 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.396 2.92499C5.975 2.59599 5.44699 2.401 4.87299 2.401C3.52199 2.401 2.422 3.485 2.388 4.836C0.993001 5.362 0 6.716 0 8.302C0 10.176 1.38501 11.725 3.18201 11.969V12.003H15.912V11.997C17.687 11.893 19.094 10.413 19.094 8.60199C19.094 6.85499 17.785 5.41602 16.1 5.22302C16.107 5.11702 16.111 5.009 16.111 4.901C16.111 2.194 13.84 0 11.039 0C8.966 0 7.183 1.20199 6.396 2.92499"
                  fill="#3B82F6"
                />
              </svg>
              <span class="text-blue-500 font-bold tracking-wide text-lg"
                >nodeops</span
              >
            </div>
            <nav
              class="mt-5 flex-shrink-0 h-full divide-y divide-gray-200/50 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div class="px-2 space-y-1">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="{ name: item.to }"
                  :class="[
                    item.current
                      ? 'text-blue-500 font-semibold'
                      : 'text-gray-400 hover:text-blue-500  font-medium',
                    'group flex items-center px-2 py-2 text-sm leading-6',
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      item.current
                        ? 'text-blue-500'
                        : 'text-gray-400 group-hover:text-blue-500',
                    ]"
                    class="mr-4 flex-shrink-0 h-6 w-6"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </router-link>
              </div>
              <div class="mt-6 pt-6">
                <div class="px-2 space-y-2">
                  <router-link
                    v-for="item in secondaryNavigation"
                    :key="item.name"
                    :to="{ name: item.to }"
                    :class="[
                      item.current
                        ? 'text-blue-500 font-semibold'
                        : 'text-gray-400 hover:text-blue-500  font-medium',
                      'group flex items-center px-2 py-2 text-sm leading-6',
                    ]"
                  >
                    <component
                      :is="item.icon"
                      :class="[
                        item.current
                          ? 'text-blue-500'
                          : 'text-gray-400 group-hover:text-blue-500',
                      ]"
                      class="mr-4 flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </router-link>
                </div>
              </div>
            </nav>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex flex-col flex-grow bg-white pt-5 overflow-y-auto border-r border-gray-200/50"
      >
        <div class="flex items-center flex-shrink-0 px-4 space-x-3 pb-5">
          <svg
            class="h-8"
            viewBox="0 0 20 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.396 2.92499C5.975 2.59599 5.44699 2.401 4.87299 2.401C3.52199 2.401 2.422 3.485 2.388 4.836C0.993001 5.362 0 6.716 0 8.302C0 10.176 1.38501 11.725 3.18201 11.969V12.003H15.912V11.997C17.687 11.893 19.094 10.413 19.094 8.60199C19.094 6.85499 17.785 5.41602 16.1 5.22302C16.107 5.11702 16.111 5.009 16.111 4.901C16.111 2.194 13.84 0 11.039 0C8.966 0 7.183 1.20199 6.396 2.92499"
              fill="#3B82F6"
            />
          </svg>
          <span class="text-blue-500 font-bold tracking-wide text-lg"
            >LinkConnect</span
          >
        </div>
        <nav
          class="mt-4 flex-1 flex flex-col divide-y divide-gray-200/50 overflow-y-auto"
          aria-label="Sidebar"
        >
          <div class="px-2 space-y-2">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="{ name: item.to }"
              :class="[
                item.current
                  ? 'text-blue-500 font-semibold'
                  : 'text-gray-400 hover:text-blue-500  font-medium',
                'group flex items-center px-2 py-2 text-sm leading-6',
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              <component
                :is="item.icon"
                :class="[
                  item.current
                    ? 'text-blue-500'
                    : 'text-gray-400 group-hover:text-blue-500',
                ]"
                class="mr-4 flex-shrink-0 h-6 w-6"
                aria-hidden="true"
              />
              {{ item.name }}
            </router-link>
          </div>
          <div class="mt-6 pt-6">
            <div class="px-2 space-y-2">
              <router-link
                v-for="item in secondaryNavigation"
                :key="item.name"
                :to="{ name: item.to }"
                :class="[
                  item.current
                    ? 'text-blue-500 font-semibold'
                    : 'text-gray-400 hover:text-blue-500  font-medium',
                  'group flex items-center px-2 py-2 text-sm leading-6',
                ]"
              >
                <component
                  :is="item.icon"
                  :class="[
                    item.current
                      ? 'text-blue-500'
                      : 'text-gray-400 group-hover:text-blue-500',
                  ]"
                  class="mr-4 flex-shrink-0 h-6 w-6"
                  aria-hidden="true"
                />
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
