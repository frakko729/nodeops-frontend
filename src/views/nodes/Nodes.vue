<script setup lang="ts">
import Container from "@/components/Container.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import { useApi } from "@/composables/api";
import { useGeneralStore } from "@/stores/generalStore";

const { get, loading, data, error } = useApi<any>("api/node"); // abstraction of axios with composition api
get(); // executes the get request, don't wait for the promise, use data and loading for check

const generalStore = useGeneralStore();
</script>

<template>
  <Container>
    <SectionHeader title="Nodes"></SectionHeader>

    <div v-if="data && !loading" class="mt-5 flex flex-col space-y-6">
      <div v-for="node in data" :key="node.id" class="flex flex-col">
        <div class="rounded-lg bg-white overflow-hidden shadow">
          <div class="bg-white p-6">
            <div class="sm:flex sm:items-center sm:justify-between">
              <div class="sm:flex sm:space-x-5 space-y-4 sm:space-y-0">
                <div class="flex-shrink-0">
                  <img
                    class="mx-auto h-16 w-16 rounded-full"
                    :src="generalStore.getImage(node.chain.image)"
                  />
                </div>
                <div class="h-max self-center">
                  <p
                    class="text-xl font-bold text-gray-900 sm:text-2xl text-center sm:text-left"
                  >
                    {{ node.name }}
                  </p>

                  <div
                    class="flex space-x-2 items-center mt-2 w-max mx-auto sm:ml-0"
                  >
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      <span v-if="node.chain.is_mainnet">Mainnet</span>
                      <span v-else>Testnet</span>
                    </span>

                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {{ node.region.name }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="pr-0 sm:pr-12 text-center mt-6 sm:mt-0">
                <span class="text-2xl font-bold text-blue-600"
                  >{{ node.node_jobs_count }} Jobs running</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>
