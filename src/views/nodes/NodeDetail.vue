<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Container from "@/components/Container.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import { useApi } from "@/composables/api";

// Used at this scope level for all variables be available inside the template, also renaming data to node
const { get, loading, data: node, overrideEndpoint } = useApi<any>("api/node/");

const route = useRoute(); // router object for getting parms
const nodeId = ref(); // ref for storing the node id

// Reruns if route.parms changes
watchEffect(() => {
  if (route.params) {
    nodeId.value = route.params.nodeId; //  Get current node Id from router and save it for easy use
    overrideEndpoint("api/node/" + nodeId.value); // override url for the changed id
    get(); // executes get request
  }
});
</script>

<template>
  <Container v-if="node && !loading">
    <SectionHeader :title="node.name"></SectionHeader>
    {{ node }}
  </Container>
</template>
