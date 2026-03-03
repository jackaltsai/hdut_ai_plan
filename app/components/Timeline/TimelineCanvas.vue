<script setup lang="ts">
import type { TimelineEvent } from '~/types/timeline';

interface Props {
  events: TimelineEvent[];
  zoom: number;
  offsetX: number;
  dateToX: (date: Date | string) => number;
  totalWidth: number;
  startDate: Date;
  endDate: Date;
  trackHeight?: number;
  selectedEventId?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  trackHeight: 4,
});

const emit = defineEmits<{
  eventClick: [eventId: string | number];
}>();

const canvasRef = ref<HTMLElement | null>(null);

/**
 * Transform style for pan and zoom
 */
const transformStyle = computed(() => {
  return {
    transform: `translateX(${props.offsetX}px)`,
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  };
});

const handleEventClick = (eventId: string | number) => {
  emit('eventClick', eventId);
};

defineExpose({
  canvasRef,
});
</script>

<template>
  <div ref="canvasRef" class="timeline-canvas" :style="transformStyle">
    <div class="canvas-content" :style="{ width: `${totalWidth}px` }">
      <!-- Axis markers -->
      <div class="axis-layer">
        <TimelineAxis
          :start-date="startDate"
          :end-date="endDate"
          :zoom="zoom"
          :date-to-x="dateToX"
          :width="totalWidth"
        />
      </div>

      <!-- Track line -->
      <div class="track-layer">
        <TimelineTrack :width="totalWidth" :height="trackHeight" />
      </div>

      <!-- Events -->
      <div class="events-layer">
        <TimelineEvents
          :events="events"
          :date-to-x="dateToX"
          :selected-event-id="selectedEventId"
          @event-click="handleEventClick"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 時間軸畫布容器 - Timeline canvas container */
.timeline-canvas {
  width: 100%; /* 佔滿父容器寬度 */
  height: 100%; /* 佔滿父容器高度 */
  position: relative; /* 為內部絕對定位元素建立定位上下文 */
  will-change: transform; /* 提示瀏覽器此元素的 transform 屬性會變化，優化渲染性能 */
  background: transparent; /* 透明背景 */
}

/* 畫布內容容器 - Canvas content container */
.canvas-content {
  position: relative; /* 為內部絕對定位的圖層建立定位上下文 */
  height: 100%; /* 佔滿父容器高度 */
  /* 寬度由動態計算的 totalWidth 控制，支援水平捲動 */
}

/* 刻度軸圖層 - Axis markers layer */
.axis-layer {
  position: absolute; /* 絕對定位，不影響其他元素的佈局 */
  top: 0; /* 對齊容器頂部 */
  left: 0; /* 對齊容器左側 */
  width: 100%; /* 佔滿容器寬度 */
  height: 60px; /* 固定高度以容納刻度標記 */
  z-index: 1; /* 層級 1：位於最底層 */
}

/* 時間軸軌道圖層 - Track line layer */
.track-layer {
  position: absolute; /* 絕對定位 */
  top: 50%; /* 垂直置中定位的起點 */
  left: 0; /* 對齊容器左側 */
  width: 100%; /* 佔滿容器寬度 */
  transform: translateY(-50%); /* 向上平移自身高度的 50%，實現垂直置中 */
  z-index: 2; /* 層級 2：位於刻度軸之上，事件之下 */
  display: flex; /* 使用 flexbox 佈局 */
  align-items: center; /* 內容垂直置中 */
}

/* 事件標記圖層 - Events layer */
.events-layer {
  position: absolute; /* 絕對定位 */
  top: 50%; /* 垂直置中定位的起點 */
  left: 0; /* 對齊容器左側 */
  width: 100%; /* 佔滿容器寬度 */
  height: 100%; /* 佔滿容器高度，為事件標記提供足夠的垂直空間 */
  transform: translateY(-50%); /* 向上平移自身高度的 50%，實現垂直置中 */
  z-index: 3; /* 層級 3：位於最上層，確保事件標記可互動 */
}
</style>
