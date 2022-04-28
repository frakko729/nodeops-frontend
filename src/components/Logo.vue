<script lang="ts" setup>
import BrandLogo from "@/assets/svgs/logo.svg";
import BrandLogoWhite from "@/assets/svgs/logo-white.svg";

interface Props {
  mode: string;
}

const { mode = "color" } = defineProps<Props>();
</script>
<template>
  <div>
    <BrandLogo v-if="mode === 'color'" class="w-full h-full" />
    <BrandLogoWhite v-else class="w-full h-full" />
  </div>
</template>
