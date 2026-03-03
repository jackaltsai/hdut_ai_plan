import { ref, computed, type Ref } from 'vue';
import type { TimelineEvent, TimelineConfig } from '~/types/timeline';

/**
 * Main timeline state management composable
 */
export const useTimeline = (
  initialEvents: TimelineEvent[],
  config: TimelineConfig = {}
) => {
  // Destructure config with defaults
  const {
    minZoom = 0.3,
    maxZoom = 8,
    defaultZoom = 1,
    eventHeight = 220,
    pixelsPerDay = 10,
    trackHeight = 4,
  } = config;

  // Core state
  const events = ref<TimelineEvent[]>(initialEvents);
  const zoom = ref<number>(defaultZoom);
  const offsetX = ref<number>(0);
  const selectedEventId = ref<string | number | undefined>(undefined);

  // Sorted events by date
  const sortedEvents = computed(() => {
    return [...events.value].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  });

  // Selected event
  const selectedEvent = computed(() => {
    if (!selectedEventId.value) return null;
    return events.value.find(e => e.id === selectedEventId.value) || null;
  });

  // Actions
  const selectEvent = (eventId: string | number | undefined) => {
    selectedEventId.value = eventId;
  };

  const clearSelection = () => {
    selectedEventId.value = undefined;
  };

  const setZoom = (newZoom: number) => {
    zoom.value = Math.max(minZoom, Math.min(maxZoom, newZoom));
  };

  const setOffset = (newOffset: number) => {
    offsetX.value = newOffset;
  };

  const resetView = () => {
    zoom.value = defaultZoom;
    offsetX.value = 0;
    selectedEventId.value = undefined;
  };

  return {
    // State
    events,
    zoom,
    offsetX,
    selectedEventId,
    sortedEvents,
    selectedEvent,

    // Config
    minZoom,
    maxZoom,
    defaultZoom,
    eventHeight,
    pixelsPerDay,
    trackHeight,

    // Actions
    selectEvent,
    clearSelection,
    setZoom,
    setOffset,
    resetView,
  };
};
