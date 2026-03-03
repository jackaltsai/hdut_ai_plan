<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import type { TimelineEvent, TimelineConfig } from '~/types/timeline';

interface Props {
  events: TimelineEvent[];
  config?: TimelineConfig;
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({}),
});

const emit = defineEmits<{
  eventClick: [eventId: string | number];
}>();

// Container ref
const containerRef = ref<HTMLElement | null>(null);
const canvasComponentRef = ref<any>(null);

// Get container size
const { width: containerWidth } = useElementSize(containerRef);

// Initialize timeline state
const timeline = useTimeline(props.events, props.config);

// Initialize scale calculations
const scale = useTimelineScale(
  timeline.events,
  timeline.zoom,
  timeline.pixelsPerDay
);

// Initialize zoom controls
const zoomControls = useTimelineZoom(
  timeline.zoom,
  timeline.minZoom,
  timeline.maxZoom
);

// Initialize pan controls
const panControls = useTimelinePan(
  timeline.offsetX,
  computed(() => canvasComponentRef.value?.canvasRef || null),
  scale.totalWidth,
  containerWidth
);

// Mouse wheel zoom
const handleWheel = (e: WheelEvent) => {
  e.preventDefault();
  if (e.deltaY < 0) {
    zoomControls.zoomIn();
  } else {
    zoomControls.zoomOut();
  }
};

// Setup event listeners
onMounted(() => {
  panControls.setupMouseListeners();
  panControls.setupTouchListeners();

  // Add wheel event listener
  if (containerRef.value) {
    containerRef.value.addEventListener('wheel', handleWheel, { passive: false });
  }
});

onBeforeUnmount(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener('wheel', handleWheel);
  }
});

// Handle event click
const handleEventClick = (eventId: string | number) => {
  timeline.selectEvent(eventId);

  // Find the clicked event and center it on screen
  const clickedEvent = timeline.sortedEvents.value.find(e => e.id === eventId);
  if (clickedEvent) {
    const eventX = scale.dateToX(clickedEvent.date);
    panControls.centerOn(eventX);
  }

  emit('eventClick', eventId);
};

// Handle control actions
const handleZoomIn = () => {
  zoomControls.zoomIn();
};

const handleZoomOut = () => {
  zoomControls.zoomOut();
};

const handleReset = () => {
  timeline.resetView();
};
</script>

<template>
  <div
    ref="containerRef"
    class="timeline-container"
    role="region"
    aria-label="Interactive Timeline"
  >
    <!-- Controls -->
    <TimelineControls
      :zoom="timeline.zoom.value"
      :can-zoom-in="zoomControls.canZoomIn()"
      :can-zoom-out="zoomControls.canZoomOut()"
      @zoom-in="handleZoomIn"
      @zoom-out="handleZoomOut"
      @reset="handleReset"
    />

    <!-- Viewport -->
    <div class="timeline-viewport" aria-label="Timeline viewport - drag to pan, scroll to zoom">
      <TimelineCanvas
        ref="canvasComponentRef"
        :events="timeline.sortedEvents.value"
        :zoom="timeline.zoom.value"
        :offset-x="timeline.offsetX.value"
        :date-to-x="scale.dateToX"
        :total-width="scale.totalWidth.value"
        :start-date="scale.dateRange.value.startDate"
        :end-date="scale.dateRange.value.endDate"
        :track-height="timeline.trackHeight"
        :selected-event-id="timeline.selectedEventId.value"
        @event-click="handleEventClick"
      />
    </div>

    <!-- Instructions -->
    <div class="timeline-instructions">
      <p>Drag to pan • Scroll to zoom • Click events for details</p>
    </div>
  </div>
</template>

<style scoped>
.timeline-container {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  max-height: 900px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(42, 42, 42, 0.6);
  border-radius: 16px;
  overflow: hidden;
  user-select: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.timeline-viewport {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: grab;
}

.timeline-viewport:active {
  cursor: grabbing;
}

.timeline-instructions {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(26, 26, 26, 0.97);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  pointer-events: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.timeline-instructions p {
  margin: 0;
  font-size: 0.8rem;
  color: #888;
  font-weight: 500;
  letter-spacing: 0.02em;
}
</style>
