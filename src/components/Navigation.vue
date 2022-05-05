<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/vue/outline";
import VueBlockies from "vue-blockies";
import { ChevronDownIcon } from "@heroicons/vue/solid";
import { useUserStore } from "@/stores/userStore";
import { useGeneralStore } from "@/stores/generalStore";
import {
  ChartBarIcon,
  DatabaseIcon,
  FolderIcon,
  HomeIcon,
} from "@heroicons/vue/outline";
import Logo from "./Logo.vue";
import { reactive, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const generalStore = useGeneralStore();

const navigation: Array<any> = reactive([
  { name: "Dashboard", icon: HomeIcon, to: "dashboard", current: false },
  { name: "Nodes", icon: FolderIcon, to: "nodes", current: false },
  { name: "Jobs", icon: DatabaseIcon, to: "jobs", current: false },
  { name: "Reports", icon: ChartBarIcon, to: "reports", current: false },
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

watchEffect(() => {
  if (route) {
    onNavigationChange(navigation, route.name, "");
  }
});
watch(
  () => route.name,
  (newVal, oldVal) => {
    onNavigationChange(navigation, newVal, oldVal);
  }
);
</script>

<template>
  <Disclosure as="nav" class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <div
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon
                @click="generalStore.openMobileNavigation()"
                v-if="!generalStore.isMobileNavigation"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XIcon
                @click="generalStore.closeMobileNavigation()"
                v-else
                class="block h-6 w-6"
                aria-hidden="true"
              />
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center">
            <Logo mode="color" class="h-10" />
          </div>
          <div class="hidden md:ml-8 md:flex md:space-x-8">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="{ name: item.to }"
              :class="{ 'border-blue-500 text-gray-900': item.current }"
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
        <div class="flex items-center">
          <div class="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
            <button
              type="button"
              class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton
                  class="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
                >
                  <div class="rounded-full w-8 h-8 overflow-hidden">
                    <VueBlockies
                      :seed="userStore.address"
                      color="#93c5fd"
                      bgcolor="#3b82f6"
                      :size="8"
                      spot-color="#2563eb"
                    />
                  </div>
                  <span
                    class="hidden ml-3 text-gray-700 text-sm font-medium lg:block"
                    ><span class="sr-only">Open user menu for </span
                    >{{ userStore.shortAdress }}</span
                  >
                  <ChevronDownIcon
                    class="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem v-slot="{ active }">
                    <router-link
                      :to="{ name: 'settings' }"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >Settings</router-link
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      @click="userStore.logout()"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                    >
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div class="md:hidden" v-if="generalStore.isMobileNavigation">
        <div class="pt-2 pb-3 space-y-1">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="{ name: item.to }"
            :class="{
              'bg-blue-50 border-blue-500 text-blue-700': item.current,
            }"
            class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
            >{{ item.name }}</router-link
          >
        </div>
        <div class="pt-4 pb-3 border-t border-gray-200">
          <div class="flex items-center px-4 sm:px-6">
            <div class="flex-shrink-0">
              <div class="rounded-full w-8 h-8 overflow-hidden">
                <VueBlockies
                  :seed="userStore.address"
                  color="#93c5fd"
                  bgcolor="#3b82f6"
                  :size="8"
                  spot-color="#2563eb"
                />
              </div>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">
                {{ userStore.shortAdress }}
              </div>
              <div class="text-sm font-medium text-gray-500">
                {{ userStore.email }}
              </div>
            </div>
            <button
              type="button"
              class="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 space-y-1">
            <router-link
              :to="{ name: 'settings' }"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
              >Settings</router-link
            >

            <DisclosureButton
              @click="userStore.logout()"
              as="button"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
              >Sign out</DisclosureButton
            >
          </div>
        </div>
      </div>
    </transition>
  </Disclosure>
</template>
