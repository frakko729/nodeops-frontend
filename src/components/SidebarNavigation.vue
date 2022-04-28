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
import Logo from "./Logo.vue";

const navigation: Array<any> = reactive([
  { name: "Dashboard", icon: HomeIcon, to: "dashboard", current: true },
  { name: "Nodes", icon: FolderIcon, to: "nodes", current: false },
  { name: "Jobs", icon: DatabaseIcon, to: "jobs", current: false },
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
            <div class="px-4 w-max">
              <Logo mode="color" class="h-12" />
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
        class="flex flex-col flex-grow bg-white pt-[15px] overflow-y-auto border-r border-gray-200/50"
      >
        <div class="flex items-center flex-shrink-0 px-4 space-x-3 pb-5">
          <Logo mode="color" class="h-12" />
        </div>
        <nav
          class="flex-1 flex flex-col divide-y divide-gray-200/50 overflow-y-auto"
          aria-label="Sidebar"
        >
          <div class="px-2 space-y-2">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="{ name: item.to }"
              :class="[
                item.current
                  ? 'font-semibold bg-gray-50 rounded'
                  : ' hover:text-blue-500  font-medium',
                'group flex items-center px-2 py-2 text-sm leading-6 text-gray-500',
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              <component
                :is="item.icon"
                :class="[item.current ? '' : ' group-hover:text-blue-500']"
                class="mr-3 flex-shrink-0 h-6 w-6"
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
