<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <div>
    <component :is="route.meta.layout" />
  </div>
</template>
