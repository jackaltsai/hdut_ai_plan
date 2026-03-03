import { ref, type Ref } from 'vue';
import { useEventListener } from '@vueuse/core';

/**
 * Timeline pan composable - handles drag/pan with boundary clamping
 */
export const useTimelinePan = (
  offsetX: Ref<number>,
  containerRef: Ref<HTMLElement | null>,
  totalWidth: Ref<number>,
  viewportWidth: Ref<number>
) => {
  const isDragging = ref(false);
  const dragStartX = ref(0);
  const dragStartOffset = ref(0);

  /**
   * Calculate bounds for panning
   */
  const getBounds = () => {
    const maxOffset = 0;
    const minOffset = Math.min(0, viewportWidth.value - totalWidth.value);
    return { minOffset, maxOffset };
  };

  /**
   * Clamp offset to bounds
   */
  const clampOffset = (offset: number): number => {
    const { minOffset, maxOffset } = getBounds();
    return Math.max(minOffset, Math.min(maxOffset, offset));
  };

  /**
   * Start pan/drag
   */
  const startPan = (clientX: number) => {
    isDragging.value = true;
    dragStartX.value = clientX;
    dragStartOffset.value = offsetX.value;
  };

  /**
   * Continue pan/drag
   */
  const movePan = (clientX: number) => {
    if (!isDragging.value) return;

    const deltaX = clientX - dragStartX.value;
    const newOffset = dragStartOffset.value + deltaX;
    offsetX.value = clampOffset(newOffset);
  };

  /**
   * End pan/drag
   */
  const endPan = () => {
    isDragging.value = false;
  };

  /**
   * Pan by a specific amount
   */
  const panBy = (deltaX: number) => {
    offsetX.value = clampOffset(offsetX.value + deltaX);
  };

  /**
   * Pan to a specific position
   */
  const panTo = (x: number) => {
    offsetX.value = clampOffset(x);
  };

  /**
   * Center on a specific X position
   */
  const centerOn = (x: number) => {
    const centeredOffset = viewportWidth.value / 2 - x;
    offsetX.value = clampOffset(centeredOffset);
  };

  /**
   * Setup mouse event listeners
   */
  const setupMouseListeners = () => {
    if (!containerRef.value) return;

    const container = containerRef.value;

    const onMouseDown = (e: MouseEvent) => {
      // Only on left click
      if (e.button !== 0) return;

      // Don't pan if clicking on interactive elements
      const target = e.target as HTMLElement;
      if (target.closest('.timeline-event-card')) return;

      startPan(e.clientX);
      e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
      movePan(e.clientX);
    };

    const onMouseUp = () => {
      endPan();
    };

    useEventListener(container, 'mousedown', onMouseDown);
    useEventListener(window, 'mousemove', onMouseMove);
    useEventListener(window, 'mouseup', onMouseUp);
  };

  /**
   * Setup touch event listeners
   */
  const setupTouchListeners = () => {
    if (!containerRef.value) return;

    const container = containerRef.value;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;

      const target = e.target as HTMLElement;
      if (target.closest('.timeline-event-card')) return;

      startPan(e.touches[0].clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      movePan(e.touches[0].clientX);
      e.preventDefault();
    };

    const onTouchEnd = () => {
      endPan();
    };

    useEventListener(container, 'touchstart', onTouchStart, { passive: true });
    useEventListener(container, 'touchmove', onTouchMove, { passive: false });
    useEventListener(container, 'touchend', onTouchEnd);
  };

  return {
    isDragging,
    startPan,
    movePan,
    endPan,
    panBy,
    panTo,
    centerOn,
    clampOffset,
    setupMouseListeners,
    setupTouchListeners,
  };
};
