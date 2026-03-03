import { type Ref } from 'vue';

/**
 * Timeline zoom composable - handles zoom logic with bounds
 */
export const useTimelineZoom = (
  zoom: Ref<number>,
  minZoom: number = 0.3,
  maxZoom: number = 8,
  zoomStep: number = 0.2
) => {
  /**
   * Zoom in
   */
  const zoomIn = () => {
    const newZoom = zoom.value + zoomStep;
    zoom.value = Math.min(newZoom, maxZoom);
  };

  /**
   * Zoom out
   */
  const zoomOut = () => {
    const newZoom = zoom.value - zoomStep;
    zoom.value = Math.max(newZoom, minZoom);
  };

  /**
   * Set zoom to specific level
   */
  const setZoom = (level: number) => {
    zoom.value = Math.max(minZoom, Math.min(maxZoom, level));
  };

  /**
   * Reset zoom to default
   */
  const resetZoom = (defaultZoom: number = 1) => {
    zoom.value = Math.max(minZoom, Math.min(maxZoom, defaultZoom));
  };

  /**
   * Zoom to fit all content in viewport
   */
  const zoomToFit = (contentWidth: number, viewportWidth: number) => {
    if (contentWidth === 0) return;
    const targetZoom = viewportWidth / contentWidth;
    setZoom(targetZoom);
  };

  /**
   * Check if can zoom in
   */
  const canZoomIn = () => zoom.value < maxZoom;

  /**
   * Check if can zoom out
   */
  const canZoomOut = () => zoom.value > minZoom;

  return {
    zoomIn,
    zoomOut,
    setZoom,
    resetZoom,
    zoomToFit,
    canZoomIn,
    canZoomOut,
  };
};
