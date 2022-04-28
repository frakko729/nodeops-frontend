<script setup lang="ts">
import Notification from "@/components/Notification.vue";
import NavigationNew from "@/components/NavigationNew.vue";
</script>

<template>
  <div>
    <NavigationNew />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <transition
            mode="out-in"
            enter-active-class="transition ease-out duration-50"
            enter-from-class="opacity-50"
            enter-to-class="opacity-100"
            leave-active-class="transition ease-in duration-50"
            leave-from-class="opacity-100"
            leave-to-class="opacity-50"
          >
            <component :is="Component" />
          </transition>
        </template>
      </router-view>
    </main>
    <teleport to="body">
      <Notification />
    </teleport>
  </div>
</template>
