<script setup lang="ts">
import { TableIcon } from "@heroicons/vue/solid";
import EmptyState from "@/components/EmptyState.vue";
import { useDayjs } from "@/composables/dayjs";

const { getDaysFromPast, format } = useDayjs();

interface Props {
  job: any;
  errors: Array<any>;
}
const { job, errors } = defineProps<Props>();
</script>

<template>
  <div
    v-if="errors.length !== 0"
    class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
  >
    <table class="min-w-full">
      <thead class="bg-white">
        <tr>
          <th
            scope="col"
            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            Errors
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <template v-for="(errorGroup, id) in errors" :key="id">
          <tr class="border-t border-gray-200">
            <th
              colspan="5"
              scope="colgroup"
              class="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
            >
              Run {{ id + 1 }} from {{ format(errorGroup.finished_at) }} has
              {{ JSON.parse(errorGroup.errors).length }} errors
            </th>
          </tr>
          <tr
            v-for="(error, errorIdx) in JSON.parse(errorGroup.errors)"
            :key="errorIdx"
            :class="[
              errorIdx === 0 ? 'border-gray-300' : 'border-gray-200',
              'border-t',
            ]"
          >
            <td
              class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
            >
              {{ error }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <div v-else>
    <EmptyState
      :icon="TableIcon"
      text="You will find all job errors here."
      disabled="true"
      class="hover:border-gray-300"
    />
  </div>
</template>
