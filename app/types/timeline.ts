/**
 * Timeline Component Type Definitions
 */

export interface TimelineEvent {
  id: string | number;
  title: string;
  date: Date | string;
  description: string;
  category?: string;
  images?: TimelineImage[];
}

export interface TimelineImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface TimelineState {
  zoom: number;
  offsetX: number;
  events: TimelineEvent[];
  selectedEventId?: string | number;
}

export interface TimelineConfig {
  minZoom?: number;
  maxZoom?: number;
  defaultZoom?: number;
  theme?: 'dark' | 'light';
  eventHeight?: number;
  pixelsPerDay?: number;
  trackHeight?: number;
}

export interface TimelineScaleConfig {
  startDate: Date;
  endDate: Date;
  zoom: number;
  pixelsPerDay: number;
  containerWidth: number;
}

export interface TimelinePosition {
  x: number;
  date: Date;
}
