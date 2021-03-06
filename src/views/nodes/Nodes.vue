<script setup lang="ts">
import Container from "@/components/Container.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import { useGeneralStore } from "@/stores/generalStore";
import { useNodeStore } from "@/stores/nodeStore";
import { onMounted } from "vue";

const generalStore = useGeneralStore();
const nodeStore = useNodeStore();

onMounted(() => {
  nodeStore.loadNodes();
});
</script>

<template>
  <Container>
    <SectionHeader title="Nodes"></SectionHeader>

    <div v-if="nodeStore.nodes" class="mt-5 flex flex-col space-y-6">
      <div v-for="node in nodeStore.nodes" :key="node.id" class="flex flex-col">
        <div class="rounded-lg bg-white overflow-hidden shadow">
          <div class="bg-white p-6">
            <div class="sm:flex sm:items-center sm:justify-between">
              <div class="sm:flex sm:space-x-5 space-y-4 sm:space-y-0">
                <div class="flex-shrink-0">
                  <img
                    v-for="chain in node.chains"
                    class="mx-auto h-16 w-16 rounded-full"
                    :src="generalStore.getImage(chain.image)"
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
                      {{ node.provider?.name }}
                    </span>
                    <span
                      v-for="chain in node.chains"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      <span v-if="chain.isMainnet">Mainnet</span>
                      <span v-else>Testnet</span>
                    </span>

                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {{ node.region?.name }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="pr-0 sm:pr-12 text-center mt-6 sm:mt-0">
                <span class="text-2xl font-bold text-blue-600"
                  >{{ node.nodeJobsCount }} Jobs running</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>
