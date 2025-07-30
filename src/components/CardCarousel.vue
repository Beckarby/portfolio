<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import Card from './card.vue';

const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
  visibleCards: {
    type: Number,
    default: 3,
  },
});

const currentSlideGlobalIndex = ref(0);
const activeDotIndex = ref(0);

let isAnimating = ref(false); 

const totalCards = computed(() => props.cards.length);
const numClones = computed(() => props.visibleCards);

const carouselItems = computed(() => {
  if (totalCards.value === 0) return [];

  const cloned = [...props.cards];
  for (let i = 0; i < numClones.value; i++) {
    cloned.unshift(props.cards[totalCards.value - 1 - i]);
  }
  for (let i = 0; i < numClones.value; i++) {
    cloned.push(props.cards[i]);
  }
  return cloned;
});

const transformStyle = computed(() => {
  return `translateX(-${
    currentSlideGlobalIndex.value * (100 / props.visibleCards)
  }%)`;
});

watch(currentSlideGlobalIndex, (newValue) => {
  const numActualCards = totalCards.value;
  const offset = numClones.value;

  let calculatedIndex = newValue - offset;

  if (calculatedIndex >= numActualCards) {
    calculatedIndex %= numActualCards;
  } else if (calculatedIndex < 0) {
    calculatedIndex =
      (numActualCards + (calculatedIndex % numActualCards)) % numActualCards;
  }
  activeDotIndex.value = calculatedIndex;
});


const transitionEndHandler = () => {
  isAnimating.value = false;

  const numActualCards = totalCards.value;
  const offset = numClones.value; 

  if (currentSlideGlobalIndex.value >= numActualCards + offset) {
    currentSlideGlobalIndex.value = offset; 
    const track = document.querySelector('.carousel-track');
    if (track) track.style.transition = 'none';
    requestAnimationFrame(() => {
      if (track) track.style.transition = 'transform 0.5s ease-in-out';
    });
  }
  else if (currentSlideGlobalIndex.value < offset) {
    currentSlideGlobalIndex.value = numActualCards + offset - 1;
    const track = document.querySelector('.carousel-track');
    if (track) track.style.transition = 'none';
    requestAnimationFrame(() => {
      if (track) track.style.transition = 'transform 0.5s ease-in-out';
    });
  }
};


const navigate = (direction) => {
  if (isAnimating.value) return; 
  isAnimating.value = true;

  if (direction === 'next') {
    currentSlideGlobalIndex.value++;
  } else if (direction === 'prev') {
    currentSlideGlobalIndex.value--;
  }
};

const goToSlide = (index) => {
  if (isAnimating.value) return;
  isAnimating.value = true;

  currentSlideGlobalIndex.value = index + numClones.value;

};


onMounted(() => {
  const track = document.querySelector('.carousel-track');
  if (track) {
    track.style.transition = 'none';
    currentSlideGlobalIndex.value = numClones.value;
    track.style.transform = transformStyle.value;
    requestAnimationFrame(() => {
      track.style.transition = 'transform 0.5s ease-in-out';
    });

    track.addEventListener('transitionend', transitionEndHandler);
  }
});

onUnmounted(() => {
  const track = document.querySelector('.carousel-track');
  if (track) {
    track.removeEventListener('transitionend', transitionEndHandler);
  }
});
</script>

<template>
  <div class="carousel-container">
    <div class="carousel-wrapper">
      <button
        class="carousel-button prev"
        @click="navigate('prev')"
        aria-label="Previous slide"
      >
        &#10094;
      </button>
      <div class="carousel-track" :style="{ transform: transformStyle }">
        <div
          v-for="(card, index) in carouselItems"
          :key="`carousel-item-${index}`"
          class="carousel-item"
          :style="{ flexBasis: `${100 / visibleCards}%` }"
        >
          <Card
            :title="card.title"
            :description="card.description"
            :image-url="card.imageUrl"
            :image-alt="card.imageAlt"
            :link-url="card.linkUrl"
            :link-text="card.linkText"
            :max-width="'100%'"
          />
        </div>
      </div>
      <button
        class="carousel-button next"
        @click="navigate('next')"
        aria-label="Next slide"
      >
        &#10095;
      </button>
    </div>

    <div class="carousel-dots">
      <span
        v-for="(card, index) in cards"
        :key="index"
        class="dot"
        :class="{ active: index === activeDotIndex }"
        @click="goToSlide(index)"
        :aria-label="`Go to slide ${index + 1}`"
      ></span>
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  position: relative;
  overflow: hidden;
  max-width: 100%;
  margin: 0 auto;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
  flex-grow: 1;
  width: 100%;
}

.carousel-item {
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 10px;
}

.carousel-button {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  z-index: 10;
  position: absolute;
  transform: translateY(-50%);
  font-size: 2rem;
  transition: background-color 0.3s ease;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.carousel-button.prev {
  left: 15px;
}

.carousel-button.next {
  right: 15px;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.dot {
  height: 12px;
  width: 12px;
  margin: 0 5px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dot.active,
.dot:hover {
  background-color: var(--primary-color);
}

@media (max-width: 767px) {
  .carousel-item {
    flex-basis: 100%;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .carousel-item {
    flex-basis: 50%;
  }
}

@media (min-width: 1024px) {
  .carousel-item {
    flex-basis: 33.33%;
  }
}
</style>