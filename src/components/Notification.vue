<script setup lang="ts">
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/vue/outline";
import { XIcon } from "@heroicons/vue/solid";
import { useNotification } from "../composables/notification";
import { ref } from "vue";
const { notification, close, notificationType } = useNotification();
const loading = ref();
</script>

<template>
  <div
    aria-live="assertive"
    class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:pt-20 sm:px-6 lg:px-8 sm:items-start"
  >
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="notification.show"
          class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircleIcon
                  v-if="notification.type === notificationType.SUCCESS"
                  class="h-6 w-6 text-green-400"
                  aria-hidden="true"
                />
                <ExclamationCircleIcon
                  v-if="notification.type === notificationType.ERROR"
                  class="h-6 w-6 text-red-400"
                  aria-hidden="true"
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-black">
                  {{ notification.title }}
                </p>
                <p class="mt-1 text-sm text-gray-800">
                  {{ notification.message }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  @click="close()"
                  class="bg-gray-100 p-1 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span class="sr-only">Close</span>
                  <XIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
