<script setup lang="ts">
import type { TimelineEvent } from '~/types/timeline';

interface Props {
  events: TimelineEvent[];
  dateToX: (date: Date | string) => number;
  selectedEventId?: string | number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  eventClick: [eventId: string | number];
}>();

/**
 * Get position for each event, alternating above and below the track
 */
const getEventPosition = (event: TimelineEvent, index: number) => {
  const x = props.dateToX(event.date);

  // Alternate events above and below the track
  const isAbove = index % 2 === 0;

  return {
    x: x - 140, // Center the card (280px width / 2)
    isAbove,
  };
};

const handleEventClick = (eventId: string | number) => {
  emit('eventClick', eventId);
};
</script>

<template>
  <div class="timeline-events">
    <div
      v-for="(event, index) in events"
      :key="event.id"
      class="event-wrapper"
      :class="{ 'is-above': getEventPosition(event, index).isAbove }"
      :style="{
        left: `${getEventPosition(event, index).x}px`,
      }"
    >
      <TimelineEventCard
        :event="event"
        :is-above="getEventPosition(event, index).isAbove"
        :is-selected="event.id === selectedEventId"
        @click="(eventId) => handleEventClick(eventId)"
      />
    </div>
  </div>
</template>

<style scoped>
.timeline-events {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.event-wrapper {
  position: absolute;
  pointer-events: all;
  transition: left 0.3s ease;
}

.event-wrapper.is-above {
  bottom: 50%;
  transform: translateY(-60px);
  margin-bottom: 20px;
}

.event-wrapper:not(.is-above) {
  top: 50%;
  transform: translateY(60px);
  margin-top: 20px;
}
</style>
