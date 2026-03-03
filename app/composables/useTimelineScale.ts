import { computed, type Ref } from 'vue';
import { differenceInDays, addDays } from 'date-fns';
import type { TimelineEvent } from '~/types/timeline';

/**
 * Timeline scale composable - handles date-to-pixel conversions
 */
export const useTimelineScale = (
  events: Ref<TimelineEvent[]>,
  zoom: Ref<number>,
  pixelsPerDay = 10
) => {
  /**
   * Get start and end dates from events with padding
   */
  const dateRange = computed(() => {
    if (!events.value.length) {
      return {
        startDate: new Date(),
        endDate: new Date(),
      };
    }

    const dates = events.value.map(e => new Date(e.date));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));

    // Add padding (10% on each side)
    const totalDays = differenceInDays(maxDate, minDate);
    const padding = Math.max(Math.floor(totalDays * 0.1), 30); // At least 30 days padding

    return {
      startDate: addDays(minDate, -padding),
      endDate: addDays(maxDate, padding),
    };
  });

  /**
   * Total width of the timeline in pixels
   */
  const totalWidth = computed(() => {
    const { startDate, endDate } = dateRange.value;
    const days = differenceInDays(endDate, startDate);
    return days * pixelsPerDay * zoom.value;
  });

  /**
   * Convert a date to X position in pixels
   */
  const dateToX = (date: Date | string): number => {
    const targetDate = new Date(date);
    const { startDate } = dateRange.value;
    const days = differenceInDays(targetDate, startDate);
    return days * pixelsPerDay * zoom.value;
  };

  /**
   * Convert X position to date
   */
  const xToDate = (x: number): Date => {
    const { startDate } = dateRange.value;
    const days = x / (pixelsPerDay * zoom.value);
    return addDays(startDate, days);
  };

  /**
   * Get the pixel distance between two dates
   */
  const getDateSpan = (date1: Date | string, date2: Date | string): number => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const days = Math.abs(differenceInDays(d2, d1));
    return days * pixelsPerDay * zoom.value;
  };

  return {
    dateRange,
    totalWidth,
    dateToX,
    xToDate,
    getDateSpan,
    pixelsPerDay,
  };
};
