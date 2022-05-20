<script setup lang="ts">
import { Tab } from "@/interfaces/Tab";
import { computed, ref, watch } from "vue";

interface Props {
  modelValue: Array<Tab>;
}
const { modelValue } = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

/**
 * Get active tab from model
 */
const activeTab = computed((): Tab | undefined =>
  modelValue.find((item) => item.current === true)
);

/**
 * On tab change emit event with updated values to parent
 *
 * @param tab
 */
const onTabChange = (tab: Tab) => {
  if (activeTab.value) {
    activeTab.value.current = false;
  }
  const nextTab = modelValue.find((item) => item.name === tab.name);
  if (nextTab) {
    nextTab.current = true;
  }
  emit("update:modelValue", modelValue);
};

/**
 * Mobile tab handling through select
 */
const select = ref(activeTab.value);

watch(select, () => {
  if (select.value) {
    onTabChange(select.value);
  }
});
</script>

<template>
  <div class="mt-4">
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select
        v-model="select"
        name="tabs"
        class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md transtion-all"
      >
        <option
          v-for="tab in modelValue"
          :key="tab.name"
          :value="tab"
          :selected="tab.current"
        >
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <div class="flex justify-between items-center">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              v-for="tab in modelValue"
              :key="tab.name"
              @click="onTabChange(tab)"
              :class="[
                tab.current
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm transtion-all',
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
                  'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block transtion-all',
                ]"
                >{{ tab.count }}</span
              >
            </button>
          </nav>

          <slot name="header"> </slot>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <slot> </slot>
    </div>
  </div>
</template>
