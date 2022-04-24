<script setup lang="ts">
import VueBlockies from "vue-blockies";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { BellIcon, MenuAlt1Icon } from "@heroicons/vue/outline";
import { ChevronDownIcon, SearchIcon } from "@heroicons/vue/solid";
import { useUserStore } from "@/stores/userStore";
import { useUIStore } from "@/stores/uiStore";
const userStore = useUserStore();
const uiStore = useUIStore();
</script>

<template>
  <div
    class="border-b border-gray-200/50 bg-white flex-1 py-3 px-4 flex justify-between sm:px-6 w-full lg:px-8"
  >
    <div
      class="w-10 h-full flex self-center border-r border-gray-200 mr-2 lg:hidden"
    >
      <button
        type="button"
        class="text-gray-400 focus:outline-none"
        @click="uiStore.toggleMobileNavigation()"
      >
        <span class="sr-only">Open sidebar</span>
        <MenuAlt1Icon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>

    <div class="flex-1 flex">
      <form class="w-full flex md:ml-0" action="#" method="GET">
        <label for="search-field" class="sr-only">Search</label>
        <div class="relative w-full text-gray-400 focus-within:text-gray-600">
          <div
            class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
            aria-hidden="true"
          >
            <SearchIcon class="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="search-field"
            name="search-field"
            class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
            placeholder="Search"
            type="search"
          />
        </div>
      </form>
    </div>
    <div class="ml-4 flex items-center md:ml-6">
      <button
        type="button"
        class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
            <span class="hidden ml-3 text-gray-700 text-sm font-medium lg:block"
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
                :class="[
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700',
                ]"
                >Logout</a
              >
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>
