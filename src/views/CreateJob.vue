<script setup lang="ts">
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon, CheckCircleIcon } from "@heroicons/vue/solid";
import { useChain } from "../composables/chains";

const methods = [
  { id: 1, name: "GET" },
  { id: 2, name: "POST" },
];
const selected = ref(methods[0]);

const tabs = [
  { name: "Parameters", href: "#", count: "0", current: true },
  { name: "Headers", href: "#", count: "0", current: false },
  { name: "Authorization", href: "#", count: "0", current: false },
  { name: "Tests", href: "#", current: false },
];

const mailingLists = [
  {
    id: 1,
    title: "Newsletter",
    description: "Last message sent an hour ago",
    users: "621 users",
  },
  {
    id: 2,
    title: "Existing Customers",
    description: "Last message sent 2 weeks ago",
    users: "1200 users",
  },
  {
    id: 3,
    title: "Trial Users",
    description: "Last message sent 4 days ago",
    users: "2740 users",
  },
];
const selectedMailingLists = ref(mailingLists[0]);

const { chains } = useChain();
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 mt-8">
    <div class="flex">
      <Listbox as="div" v-model="selected">
        <div class="relative w-28">
          <ListboxButton
            class="h-12 bg-white relative w-full border border-gray-300 rounded-l-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <span class="block truncate">{{ selected.name }}</span>
            <span
              class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
            >
              <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <ListboxOption
                as="template"
                v-for="method in methods"
                :key="method.id"
                :value="method"
                v-slot="{ active, selected }"
              >
                <li
                  :class="[
                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                    'cursor-default select-none relative py-2 pl-3 pr-9',
                  ]"
                >
                  <span
                    :class="[
                      selected ? 'font-semibold' : 'font-normal',
                      'block truncate',
                    ]"
                  >
                    {{ method.name }}
                  </span>

                  <span
                    v-if="selected"
                    :class="[
                      active ? 'text-white' : 'text-indigo-600',
                      'absolute inset-y-0 right-0 flex items-center pr-4',
                    ]"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>

      <input
        class="h-12 w-full px-4 rounded-r-md border border-gray-300 shadow-sm"
        placeholder="https://external-api.dev/api/example"
      />
    </div>

    <div class="mt-4">
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
        <select
          id="tabs"
          name="tabs"
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
            {{ tab.name }}
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <a
              v-for="tab in tabs"
              :key="tab.name"
              href="#"
              :class="[
                tab.current
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm',
              ]"
              :aria-current="tab.current ? 'page' : undefined"
            >
              {{ tab.name }}
              <span
                v-if="tab.count"
                :class="[
                  tab.current
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-900',
                  'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block',
                ]"
                >{{ tab.count }}</span
              >
            </a>
          </nav>
        </div>
      </div>
      <div
        class="mt-4 h-40 relative block w-full border-2 border-gray-200 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      ></div>
    </div>

    <div class="mt-8">
      <RadioGroup v-model="selectedMailingLists">
        <RadioGroupLabel class="text-base font-medium text-gray-900">
          Select a chain
        </RadioGroupLabel>

        <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
          <RadioGroupOption
            as="template"
            v-for="chain in chains"
            :key="chain.chainId"
            :value="chain"
            v-slot="{ checked, active }"
          >
            <div
              :class="[
                checked ? 'border-transparent' : 'border-gray-200',
                active ? 'ring-2 ring-blue-500' : '',
                'relative  bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none',
              ]"
            >
              <div class="flex-1 flex">
                <div class="flex flex-col">
                  <RadioGroupLabel
                    as="div"
                    class="block text-sm font-medium text-gray-900"
                  >
                    <component
                      :is="chain.icon"
                      class="block h-16 w-16"
                    ></component>
                    <span class="block mt-4 text-gray-700">{{
                      chain.name
                    }}</span>
                  </RadioGroupLabel>

                  <RadioGroupDescription
                    as="span"
                    :class="{
                      'bg-blue-100 text-blue-800': chain.isMainnet,
                      'bg-red-100 text-red-800': !chain.isMainnet,
                    }"
                    class="mt-2 w-max inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    <span v-if="chain.isMainnet">Mainnet</span>
                    <span v-else>Testnet</span>
                  </RadioGroupDescription>
                </div>
              </div>
              <CheckCircleIcon
                :class="[
                  !checked ? 'invisible' : '',
                  'h-5 w-5 text-indigo-600',
                ]"
                aria-hidden="true"
              />
              <div
                :class="[
                  active ? 'border' : 'border-2',
                  checked ? 'border-blue-500' : 'border-transparent',
                  'absolute -inset-px rounded-lg pointer-events-none',
                ]"
                aria-hidden="true"
              />
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
  </div>
</template>
