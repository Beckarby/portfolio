<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    default: 'Card image',
  },
  linkUrl: {
    type: String,
    required: true,
  },
  linkText: {
    type: String,
    default: 'Learn More',
  },
  maxWidth: {
    type: String,
    default: '350px', 
  },
});

const formattedLinkUrl = computed(() => {
  if (props.linkUrl && !props.linkUrl.startsWith('http://') && !props.linkUrl.startsWith('https://')) {
    return `https://${props.linkUrl}`; 
  }
  return props.linkUrl;
});
</script>

<template>
  <div class="card" :style="{ maxWidth: maxWidth }">
    <div class="card-image-container">
      <img :src="imageUrl" :alt="imageAlt" class="card-image" loading="lazy" />
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
      <a
        :href="formattedLinkUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="card-link"
      >
        {{ linkText }}
        <span class="icon-external-link" aria-hidden="true">↗</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  overflow: hidden; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%; 
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.card-image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  background-color: var(--surface-ground); 
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  display: block; 
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-title {
  font-size: 1.5rem;
  color: var(--color-heading);
  margin-top: 0;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.card-description {
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: 1.25rem;
  line-height: 1.6;
  flex-grow: 1; 
}

.card-link {
  display: inline-flex;
  align-items: center;
  margin-top: auto; 
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.card-link:hover {
  color: var(--primary-color-text);
}

.icon-external-link {
  margin-left: 0.5rem;
  font-size: 0.9em;
  vertical-align: middle;
}

@media (max-width: 768px) {
  .card-image-container {
    height: 180px;
  }

  .card-title {
    font-size: 1.3rem;
  }

  .card-description {
    font-size: 0.95rem;
  }
}
</style>