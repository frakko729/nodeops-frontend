<script setup lang="ts">
import SidebarNavigation from "./components/SidebarNavigation.vue";
import Notification from "./components/Notification.vue";
import Navigation from "./components/Navigation.vue";
</script>

<template>
  <div class="min-h-full">
    <SidebarNavigation />

    <div class="lg:pl-64 flex flex-col flex-1">
      <Navigation />
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
    </div>
    <teleport to="body">
      <Notification />
    </teleport>
  </div>
</template>
