<script setup lang="ts">
import { format } from 'date-fns';
import type { TimelineEvent } from '~/types/timeline';

interface Props {
  event: TimelineEvent;
  isAbove?: boolean;
  isSelected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isAbove: true,
  isSelected: false,
});

const emit = defineEmits<{
  click: [eventId: string | number];
}>();

const imageLoaded = ref(false);
const imageError = ref(false);

const formattedDate = computed(() => {
  return format(new Date(props.event.date), 'MMMM d, yyyy');
});

const handleClick = () => {
  emit('click', props.event.id);
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleClick();
  }
};

const handleImageLoad = () => {
  imageLoaded.value = true;
  imageError.value = false;
};

const handleImageError = () => {
  imageError.value = true;
  console.error('Failed to load image:', props.event.images?.[0]?.url);
};

const imgRef = ref<HTMLImageElement | null>(null);

// Reset loading state when event changes
watch(() => props.event.id, () => {
  imageLoaded.value = false;
  imageError.value = false;
});

// Check if image is already loaded (from cache)
onMounted(() => {
  if (imgRef.value && imgRef.value.complete) {
    if (imgRef.value.naturalHeight !== 0) {
      imageLoaded.value = true;
    } else {
      imageError.value = true;
    }
  }

  // Fallback: If image doesn't load within 5 seconds, show it anyway
  if (props.event.images && props.event.images.length > 0) {
    setTimeout(() => {
      if (!imageLoaded.value && !imageError.value) {
        imageLoaded.value = true;
      }
    }, 5000);
  }
});
</script>

<template>
  <div
    class="timeline-event-card"
    :class="{ 'is-selected': isSelected, 'is-above': isAbove }"
    role="button"
    tabindex="0"
    :aria-label="`Event: ${event.title} on ${formattedDate}`"
    :aria-pressed="isSelected"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <!-- Connection line to track -->
    <div class="event-connector" :class="{ 'is-above': isAbove }" />

    <!-- Card content -->
    <div class="card-content">
      <!-- Date badge -->
      <div class="event-date">{{ formattedDate }}</div>

      <!-- Image if available -->
      <div v-if="event.images && event.images.length > 0" class="event-image">
        <div v-if="!imageLoaded && !imageError" class="image-loading">
          <div class="loading-spinner"></div>
        </div>
        <img
          ref="imgRef"
          :src="event.images[0]?.url"
          :alt="event.images[0]?.alt || event.title"
          :class="{ 'is-loaded': imageLoaded, 'has-error': imageError }"
          loading="lazy"
          @load="handleImageLoad"
          @error="handleImageError"
        />
        <div v-if="imageError" class="image-error">
          <Icon name="ph:image-broken" />
        </div>
      </div>

      <!-- Title -->
      <h3 class="event-title">{{ event.title }}</h3>

      <!-- Category badge -->
      <div v-if="event.category" class="event-category">
        {{ event.category }}
      </div>

      <!-- Description -->
      <p class="event-description">{{ event.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.timeline-event-card {
  width: 280px;
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.timeline-event-card.is-above {
  flex-direction: column-reverse;
}

.timeline-event-card:not(.is-above) {
  flex-direction: column;
}

.timeline-event-card:hover {
  transform: translateY(-4px);
}

.timeline-event-card:hover .card-content {
  box-shadow: 0 8px 28px rgba(102, 126, 234, 0.4);
  border-color: rgba(102, 126, 234, 0.4);
}

.timeline-event-card.is-selected .card-content {
  border-color: rgba(102, 126, 234, 0.8);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.6);
  background: rgba(26, 26, 26, 0.98);
}

.event-connector {
  width: 2px;
  height: 40px;
  background: linear-gradient(to bottom, #667eea, #764ba2);
  margin: 0 auto;
  position: relative;
}

.event-connector.is-above::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background: #667eea;
  border: 2px solid #1a1a1a;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
}

.event-connector:not(.is-above)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background: #667eea;
  border: 2px solid #1a1a1a;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
}

.card-content {
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(42, 42, 42, 0.8);
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.event-date {
  font-size: 0.75rem;
  color: #667eea;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

.event-image {
  width: 100%;
  height: auto;
  min-height: 120px;
  max-height: 180px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0.75rem;
  background: #0a0a0a;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.event-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0;
}

.event-image img.is-loaded {
  opacity: 1;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.event-image img.has-error {
  display: none;
}

.timeline-event-card:hover .event-image img.is-loaded {
  transform: scale(1.05);
}

.image-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 10, 10, 0.8);
  z-index: 1;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #2a2a2a;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.image-error {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
  color: #666;
  font-size: 2rem;
}

.event-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #e0e0e0;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.event-category {
  display: inline-block;
  font-size: 0.625rem;
  color: #ffffff;
  background: rgba(118, 75, 162, 0.1);
  border: 1px solid rgba(134, 178, 240, 0.3);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.event-description {
  font-size: 0.875rem;
  color: #999;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
