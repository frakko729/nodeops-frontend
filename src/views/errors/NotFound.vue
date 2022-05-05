<script setup lang="ts">
import { useRouter } from "vue-router";
import Logo from "@/components/Logo.vue";
const router = useRouter();
</script>

<template>
  <div class="min-h-full flex flex-col">
    <main
      class="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div class="flex-shrink-0 flex justify-center">
        <a href="/" class="inline-flex">
          <Logo mode="color" class="h-20" />
        </a>
      </div>

      <div class="pt-12 pb-8">
        <div class="text-center">
          <p
            class="text-sm font-semibold text-blue-600 uppercase tracking-wide"
          >
            404 error
          </p>
          <h1
            class="mt-4 text-4xl font-extrabold text-whitetracking-tight sm:text-5xl"
          >
            Page not found.
          </h1>
          <p class="mt-4 text-base text-gray-500">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div class="mt-6">
            <button
              @click="router.back()"
              class="text-base font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Go back home<span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
