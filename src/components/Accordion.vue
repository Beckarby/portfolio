<script setup>
import { ref, provide } from 'vue';

const props = defineProps({
  initialOpenId: {
    type: [String, Number],
    default: null, 
  },
  
  singleOpen: {
    type: Boolean,
    default: true,
  },
});

const activeItemId = ref(props.initialOpenId);

const toggleItem = (id) => {
  if (activeItemId.value === id) {
    activeItemId.value = null; // Close if already open
  } else {
    if (props.singleOpen) {
      activeItemId.value = id; // Open new item (and close previous if singleOpen)
    } else {
      activeItemId.value = id;
    }
  }
};

// Provide the activeItemId (as a ref) and the toggleItem function to child components
// This will allow AccordionItem to react to changes in activeItemId
provide('activeItemId', activeItemId);
provide('toggleItem', toggleItem);
</script>

<template>
  <div class="accordion-wrapper">
    <slot></slot>
  </div>
</template>

<style scoped>
.accordion-wrapper {
  border-radius: 8px;
  overflow: hidden; 
}
</style>