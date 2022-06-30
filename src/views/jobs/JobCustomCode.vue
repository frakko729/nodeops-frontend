<script setup lang="ts">
import { markRaw, reactive } from "vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import Container from "@/components/Container.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import { TerminalIcon, UploadIcon } from "@heroicons/vue/outline";
import JavascriptEditor from "../../components/JavascriptEditor.vue";

const breadcrumb = reactive([
  {
    text: "Jobs",
    route: { name: "jobs" },
  },
  {
    text: "Create new Job",
    route: { name: "job-create" },
  },
  {
    text: "Create with custom code",
    route: { name: "job-create-custom-code" },
    isActive: true,
  },
]);
</script>

<template>
  <Container>
    <Breadcrumb :items="breadcrumb" class="mb-4" />
    <SectionHeader
      title="Create with custom code"
      class="flex justify-between items-center mb-2 sm:mb-4"
    >
      <div class="flex space-x-4">
        <button class="btn btn-secondary">
          <TerminalIcon class="sm:-ml-1 sm:mr-2 h-4 w-4" /> <span>Run</span>
        </button>
        <button class="btn btn-primary">
          <UploadIcon class="sm:-ml-1 sm:mr-2 h-4 w-4" /> <span>Upload</span>
        </button>
      </div>
    </SectionHeader>

    <JavascriptEditor class="mt-4" />
  </Container>
</template>
