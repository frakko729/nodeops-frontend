<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <div class="min-h-full pt-16 pb-12 flex flex-col">
    <main
      class="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div class="flex-shrink-0 flex justify-center">
        <a href="/" class="inline-flex"> </a>
      </div>
      <div class="pt-2 pb-8">
        <div class="text-center">
          <p class="text-sm font-semibold text-red-600 uppercase tracking-wide">
            404 error
          </p>
          <h1
            class="mt-4 text-4xl font-extrabold text-whitetracking-tight sm:text-5xl"
          >
            Page not found.
          </h1>
          <p class="mt-4 text-base text-gray-400">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div class="mt-6">
            <a
              @click="router.back()"
              class="text-base font-medium text-red-600 hover:text-red-500"
              >Go back home<span aria-hidden="true"> &rarr;</span></a
            >
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
