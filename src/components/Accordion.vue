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
    activeItemId.value = null; 
  } else {
    if (props.singleOpen) {
      activeItemId.value = id; 
    } else {
      activeItemId.value = id;
    }
  }
};

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