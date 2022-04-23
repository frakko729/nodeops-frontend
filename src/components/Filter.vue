<script setup lang="ts">
import {
  Dialog,
  DialogOverlay,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/outline";
import { ChevronDownIcon } from "@heroicons/vue/solid";
import { ref } from "vue";

interface Props {
  show?: boolean;
}

const { show = false } = defineProps<Props>();

const sortOptions = [
  { name: "Newest", href: "#", current: false },
  { name: "Chain", href: "#", current: false },
  { name: "Status", href: "#", current: true },
];
const filters = [
  {
    id: "chains",
    name: "Chains",
    options: [
      { value: "eth", label: "Ethereum", checked: false },
      { value: "bnb", label: "Binance Smart Chain", checked: false },
      { value: "polygon", label: "Polygon", checked: false },
      { value: "axax", label: "Avalanche", checked: false },
    ],
  },
  {
    id: "status",
    name: "Status",
    options: [
      { value: "running", label: "Running", checked: false },
      { value: "warning", label: "Warning", checked: false },
      { value: "error", label: "Error", checked: false },
    ],
  },
];
const open = ref(false);
</script>
<template>
  <div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0"
      enter-to-class="transform opacity-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div v-if="show">
        <!-- Filters -->
        <section aria-labelledby="filter-heading">
          <h2 id="filter-heading" class="sr-only">Filters</h2>

          <div class="relative z-10 border-b border-t border-gray-200 py-4">
            <div class="flex items-center justify-between px-2">
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton
                    class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Sort
                    <ChevronDownIcon
                      class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
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
                    class="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div class="py-1">
                      <MenuItem
                        v-for="option in sortOptions"
                        :key="option.name"
                        v-slot="{ active }"
                      >
                        <a
                          :href="option.href"
                          :class="[
                            option.current
                              ? 'font-medium text-gray-900'
                              : 'text-gray-500',
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm',
                          ]"
                        >
                          {{ option.name }}
                        </a>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>

              <button
                type="button"
                class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                @click="open = true"
              >
                Filters
              </button>

              <div class="hidden sm:block">
                <div class="flow-root">
                  <PopoverGroup
                    class="-mx-4 flex items-center divide-x divide-gray-200"
                  >
                    <Popover
                      v-for="(section, sectionIdx) in filters"
                      :key="section.name"
                      class="px-4 relative inline-block text-left"
                    >
                      <PopoverButton
                        class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                      >
                        <span>{{ section.name }}</span>
                        <span
                          v-if="sectionIdx === 0"
                          class="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums"
                          >1</span
                        >
                        <ChevronDownIcon
                          class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </PopoverButton>

                      <transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                      >
                        <PopoverPanel
                          class="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <form class="space-y-4">
                            <div
                              v-for="(option, optionIdx) in section.options"
                              :key="option.value"
                              class="flex items-center"
                            >
                              <input
                                :id="`filter-${section.id}-${optionIdx}`"
                                :name="`${section.id}[]`"
                                :value="option.value"
                                type="checkbox"
                                :checked="option.checked"
                                class="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                              />
                              <label
                                :for="`filter-${section.id}-${optionIdx}`"
                                class="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                              >
                                {{ option.label }}
                              </label>
                            </div>
                          </form>
                        </PopoverPanel>
                      </transition>
                    </Popover>
                  </PopoverGroup>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </transition>
    <!-- Mobile filter dialog -->
    <TransitionRoot as="template" :show="open">
      <Dialog
        as="div"
        class="fixed inset-0 flex z-40 sm:hidden"
        @close="open = false"
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
          <DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="translate-x-full"
        >
          <div
            class="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto"
          >
            <div class="px-4 flex items-center justify-between">
              <h2 class="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                class="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                @click="open = false"
              >
                <span class="sr-only">Close menu</span>
                <XIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <!-- Filters -->
            <form class="mt-4">
              <Disclosure
                as="div"
                v-for="section in filters"
                :key="section.name"
                class="border-t border-gray-200 px-4 py-6"
                v-slot="{ open }"
              >
                <h3 class="-mx-2 -my-3 flow-root">
                  <DisclosureButton
                    class="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400"
                  >
                    <span class="font-medium text-gray-900">
                      {{ section.name }}
                    </span>
                    <span class="ml-6 flex items-center">
                      <ChevronDownIcon
                        :class="[
                          open ? '-rotate-180' : 'rotate-0',
                          'h-5 w-5 transform',
                        ]"
                        aria-hidden="true"
                      />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel class="pt-6">
                  <div class="space-y-6">
                    <div
                      v-for="(option, optionIdx) in section.options"
                      :key="option.value"
                      class="flex items-center"
                    >
                      <input
                        :id="`filter-mobile-${section.id}-${optionIdx}`"
                        :name="`${section.id}[]`"
                        :value="option.value"
                        type="checkbox"
                        :checked="option.checked"
                        class="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        :for="`filter-mobile-${section.id}-${optionIdx}`"
                        class="ml-3 text-sm text-gray-500"
                      >
                        {{ option.label }}
                      </label>
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </form>
          </div>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
