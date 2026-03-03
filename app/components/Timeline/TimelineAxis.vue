<script setup lang="ts">
import { format, addMonths, addYears, differenceInMonths, differenceInYears } from 'date-fns';

interface Props {
  startDate: Date;
  endDate: Date;
  zoom: number;
  dateToX: (date: Date) => number;
  width: number;
}

const props = defineProps<Props>();

/**
 * Generate axis markers based on zoom level
 */
const markers = computed(() => {
  const { startDate, endDate, zoom } = props;

  // Determine interval based on zoom level
  let interval: 'year' | 'month';
  let step: number;

  if (zoom < 0.5) {
    // Zoomed out: show years
    interval = 'year';
    step = Math.max(1, Math.floor(5 / zoom));
  } else if (zoom < 2) {
    // Medium zoom: show years
    interval = 'year';
    step = 1;
  } else {
    // Zoomed in: show months
    interval = 'month';
    step = zoom > 4 ? 1 : 3; // Every month if very zoomed, else quarterly
  }

  const result: Array<{ date: Date; x: number; label: string }> = [];

  if (interval === 'year') {
    const years = differenceInYears(endDate, startDate) + 1;
    for (let i = 0; i < years; i += step) {
      const date = addYears(startDate, i);
      if (date > endDate) break;

      result.push({
        date,
        x: props.dateToX(date),
        label: format(date, 'yyyy'),
      });
    }
  } else {
    const months = differenceInMonths(endDate, startDate) + 1;
    for (let i = 0; i < months; i += step) {
      const date = addMonths(startDate, i);
      if (date > endDate) break;

      result.push({
        date,
        x: props.dateToX(date),
        label: format(date, 'MMM yyyy'),
      });
    }
  }

  return result;
});
</script>

<template>
  <div class="timeline-axis">
    <div
      v-for="marker in markers"
      :key="marker.date.getTime()"
      class="axis-marker"
      :style="{ left: `${marker.x}px` }"
    >
      <div class="marker-tick" />
      <div class="marker-label">{{ marker.label }}</div>
    </div>
  </div>
</template>

<style scoped>
.timeline-axis {
  position: relative;
  width: 100%;
  height: 60px;
  pointer-events: none;
}

.axis-marker {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.marker-tick {
  width: 1px;
  height: 12px;
  background: #444;
  margin-bottom: 4px;
}

.marker-label {
  font-size: 0.75rem;
  color: #666;
  font-weight: 500;
  white-space: nowrap;
  user-select: none;
}
</style>
