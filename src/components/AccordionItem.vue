<script setup>
import { inject, computed } from 'vue';

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const activeItemId = inject('activeItemId');
const toggleItem = inject('toggleItem');

const isOpen = computed(() => {
  return activeItemId.value === props.id;
});
</script>

<template>
  <div class="accordion-item" :class="{ 'is-open': isOpen }">
    <button
      class="accordion-header"
      @click="toggleItem(id)"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-controls="`accordion-content-${id}`"
    >
      <span class="accordion-title">{{ title }}</span>
      <span class="accordion-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon"
          :class="{ 'icon-rotated': isOpen }"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </span>
    </button>
    <div
      :id="`accordion-content-${id}`"
      class="accordion-content-wrapper"
      :style="{ maxHeight: isOpen ? '500px' : '0' }"
    >
      <div class="accordion-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion-item {
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  margin-bottom: 0.75rem; 
  overflow: hidden; 
  background-color: var(--surface-card);
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease;
}

.accordion-item:last-child {
  margin-bottom: 0;
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: var(--surface-card);
  color: var(--text-color);
  font-size: 1.15rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  text-align: left;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.accordion-header:hover {
  background-color: var(--surface-hover);
}

.accordion-title {
  flex-grow: 1;
}

.accordion-icon {
  display: flex; 
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-left: 1rem;
}

.icon {
  width: 100%;
  height: 100%;
  color: var(--text-color-secondary);
  transition: transform 0.3s ease;
}

.icon-rotated {
  transform: rotate(180deg);
}

.accordion-content-wrapper {
  max-height: 0; 
  overflow: hidden;
  transition: max-height 0.3s ease-out; 
}

.accordion-content {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  color: var(--text-color-secondary);
  line-height: 1.6;
  font-size: 0.95rem;
}

.accordion-item.is-open {
  border-color: var(--primary-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); 
}

.accordion-item.is-open .accordion-header {
  color: var(--primary-color);
  background-color: var(--surface-hover);
  border-bottom: 1px solid var(--surface-border);
}

.accordion-item.is-open .icon {
  color: var(--primary-color);
}
</style>