<script setup lang="ts">
interface Props {
  zoom: number;
  canZoomIn: boolean;
  canZoomOut: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  zoomIn: [];
  zoomOut: [];
  reset: [];
}>();

const zoomPercentage = computed(() => {
  return Math.round(props.zoom * 100);
});
</script>

<template>
  <div class="timeline-controls">
    <div class="controls-group">
      <!-- Zoom Out -->
      <button
        class="control-btn"
        :disabled="!canZoomOut"
        @click="emit('zoomOut')"
        aria-label="Zoom out"
        title="Zoom out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="8" y1="11" x2="14" y2="11" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      <!-- Zoom Level -->
      <div class="zoom-level">{{ zoomPercentage }}%</div>

      <!-- Zoom In -->
      <button
        class="control-btn"
        :disabled="!canZoomIn"
        @click="emit('zoomIn')"
        aria-label="Zoom in"
        title="Zoom in"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      <!-- Reset -->
      <button
        class="control-btn"
        @click="emit('reset')"
        aria-label="Reset view"
        title="Reset view"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.timeline-controls {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 100;
}

.controls-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(26, 26, 26, 0.97);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 10px;
  padding: 0.6rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(42, 42, 42, 0.5);
  border: 1px solid rgba(42, 42, 42, 0.8);
  border-radius: 6px;
  color: #e0e0e0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.control-btn:active:not(:disabled) {
  transform: translateY(0);
}

.control-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.zoom-level {
  font-size: 0.875rem;
  color: #888;
  font-weight: 600;
  min-width: 50px;
  text-align: center;
  user-select: none;
}
</style>
