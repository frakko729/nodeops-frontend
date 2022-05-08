<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import Container from "@/components/Container.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import { useApi } from "@/composables/api";

// Used at this scope level and not inside watchEffect for all variables be available inside the template
const {
  get, // function for executing the get request
  loading, // bool loading indicator
  data: node, // response data, renaming data var to node
  overrideEndpoint, // function for overriding the endpoint
  error, // holds all errors after execution
} = useApi<any>("api/node/");

const route = useRoute(); // route object for getting parms
const nodeId = ref(); // ref for storing the node id

// Reruns if route.parms changes, also runs on page init
watchEffect(() => {
  if (route.params) {
    nodeId.value = route.params.nodeId; //  Get current node Id from router and save it for easy use

    // nodeId.value can be undefined because of side effects, so make sure it executes only if not
    if (nodeId.value) {
      overrideEndpoint("api/node/" + nodeId.value); // override url for the changed id
      get(); // executes get request
    }
  }
});

const router = useRouter(); // router for doing redirects

// Watch for errors
watch(error, () => {
  console.log(error.value);
  router.push({ name: "NotFound" }); // if request has error, probably becuase the id is not found on the backend or you have no access to it, redirect to 404 error page
});
</script>

<template>
  <Container v-if="node && !loading">
    <SectionHeader :title="node.name"></SectionHeader>
    {{ node }}
  </Container>
</template>
