<script setup lang="ts">
interface Props {
  width: number;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  height: 4,
});
</script>

<template>
  <div
    class="timeline-track"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
    }"
  />
</template>

<style scoped>
.timeline-track {
  background: linear-gradient(to right, #667eea, #764ba2);
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
  position: relative;
}
</style>
