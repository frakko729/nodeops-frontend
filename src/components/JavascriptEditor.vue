<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { ref, watch } from "vue";

interface Props {
  modelValue: string;
  disabled?: boolean;
  height?: string;
}
const { modelValue, disabled = false, height = "680" } = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const extensions = [javascript(), oneDark];

const log = (text: any, $event: any) => console.log({ text, $event });
</script>

<template>
  <div>
    <codemirror
      :disabled="disabled"
      v-model="modelValue"
      placeholder="Code goes here..."
      :style="{ height: `${height}px`, borderRadius: '25px' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="log('ready', $event)"
      @change="log('change', $event)"
      @focus="log('focus', $event)"
      @blur="log('blur', $event)"
    />
  </div>
</template>
