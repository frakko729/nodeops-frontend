<script setup lang="ts">
import Container from "@/components/Container.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import { useApi } from "@/composables/api";

const { get, loading, data, error } = useApi<any>("api/node"); // abstraction of axios with composition api
get(); // executes the get request, don't wait for the promise, use data and loading for check
</script>

<template>
  <Container>
    <SectionHeader title="Nodes"></SectionHeader>

    <div v-if="data && !loading" class="mt-8">
      <div v-for="node in data" :key="node.id" class="flex flex-col">
        <pre>{{ node }}</pre>

        <!-- Detail Page Link, check router.ts for names and parms -->
        <router-link
          :to="{ name: 'node-detail', params: { nodeId: node.id } }"
          class="mt-2"
        >
          Detail Page
        </router-link>
      </div>
    </div>
  </Container>
</template>
