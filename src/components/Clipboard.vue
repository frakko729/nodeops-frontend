<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { ClipboardCopyIcon, ClipboardCheckIcon } from "@heroicons/vue/outline";
import { watch } from "vue";
import { useNotification } from "@/composables/notification";

interface Props {
  source: any;
  title: string;
}
const { source, title } = defineProps<Props>();

const { text, copy, copied, isSupported } = useClipboard({ source });

const { showSuccess } = useNotification();
watch(copied, () => {
  showSuccess(`${title} copied to clipboard.`);
});
</script>

<template>
  <button
    @click="copy(source)"
    class="text-gray-700 hover:text-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-blue-500 rounded-full border-none"
    title="Copy to clipboard"
  >
    <!-- by default, `copied` will be reset in 1.5s -->
    <transition
      mode="out-in"
      enter-active-class="transition ease-out duration-75"
      enter-from-class="transform opacity-0"
      enter-to-class="transform opacity-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100"
      leave-to-class="transform opacity-0"
    >
      <ClipboardCopyIcon class="w-6 h-6" :key="1" v-if="!copied" />
      <ClipboardCheckIcon class="w-6 h-6" :key="2" v-else />
    </transition>
  </button>
</template>
