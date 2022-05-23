<script setup lang="ts">
import Notification from "@/components/Notification.vue";
</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <component :is="Component" />
      </template>
    </router-view>
    <teleport to="body">
      <Notification />
    </teleport>
  </div>
</template>
