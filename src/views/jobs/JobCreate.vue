<script setup lang="ts">
import { markRaw, reactive } from "vue";
import { CloudIcon, CodeIcon, BeakerIcon } from "@heroicons/vue/outline";
import Container from "@/components/Container.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import Badge from "@/components/Badge.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import Steps from "@/components/Steps.vue";

interface Action {
  title: string;
  description: string;
  icon: any;
  route: {};
  isDisabled?: boolean;
}

const actions: Action[] = [
  {
    title: "Create with UI",
    description: "The simplest way to create a job with our UI.",
    icon: markRaw(BeakerIcon),
    route: { name: "job-create-ui" },
  },
  {
    title: "Create with custom code",
    description: "Write custom javascript code for your bridge.",
    icon: markRaw(CodeIcon),
    route: { name: "job-create-custom-code" },
    isDisabled: false,
  },
  {
    title: "Create with existing bridge",
    description: "Use your existing hosted bridge for a new job.",
    icon: markRaw(CloudIcon),
    route: { name: "job-create-existing-bridge" },
    isDisabled: true,
  },
];

const breadcrumb = reactive([
  {
    text: "Jobs",
    route: { name: "jobs" },
  },
  {
    text: "Create new Job",
    route: { name: "job-create" },
    isActive: true,
  },
]);
</script>

<template>
  <Container>
    <SectionHeader title="Create new Job" />

    <div
      class="flex flex-col md:flex-row mx-auto w-full space-y-6 md:space-y-0 md:space-x-4 lg:space-x-8 xl:space-y-0 mt-8"
    >
      <router-link
        v-for="action in actions"
        :disabled="action.isDisabled"
        :to="!action.isDisabled ? action.route : {}"
        :class="{
          'hover:shadow-md': !action.isDisabled,
          'cursor-not-allowed': action.isDisabled,
        }"
        class="relative group w-full md:w-1/3 flex flex-col items-center bg-white border border-gray-100 rounded-lg py-8 shadow-sm transition-all"
      >
        <div
          class="w-16 h-16 bg-blue-50 items-center justify-center flex rounded-full"
        >
          <component
            :is="action.icon"
            class="w-10 h-10 text-blue-500 group-hover:text-blue-600 transition-colors"
          ></component>
        </div>
        <div>
          <h3 class="mt-5 font-medium text-lg text-gray-800">
            {{ action.title }}
          </h3>
        </div>

        <p class="w-2/3 mt-3 text-gray-500 text-center">
          {{ action.description }}
        </p>

        <Badge
          class="absolute top-3 right-3"
          v-if="action.isDisabled"
          text="Coming soon"
        />
      </router-link>
    </div>
  </Container>
</template>
