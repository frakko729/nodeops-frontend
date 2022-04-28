<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <component :is="Component" />
    </template>
  </router-view>
</template>
