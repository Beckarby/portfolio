<script setup>
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';
import Card from '../components/card.vue';
import SkillChart from '../components/SkillChart.vue';
import CardCarousel from '../components/CardCarousel.vue';

const { user } = useAuth();
const router = useRouter();

const projects = [
  {
    id: 1,
    title: 'Prueba 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: '/public/prueba-card.png',
    linkUrl: 'https://github.com',
    linkText: 'View Project',
  },
  {
    id: 2,
    title: 'Prueba 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: '/public/prueba2.jpeg',
    linkUrl: 'https://github.com',
    linkText: 'View Project',
  },
  {
    id: 3,
    title: 'Prueba 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: '/public/prueba3.jpeg',
    linkUrl: 'https://github.com',
    linkText: 'View Project',
  },
  {
    id: 4,
    title: 'Prueba 4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: '/public/prueba4.jpeg',
    linkUrl: 'https://github.com',
    linkText: 'View Project',
  },
  {
    id: 5,
    title: 'Prueba 5',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: '/public/prueba5.jpeg',
    linkUrl: 'https://github.com',
    linkText: 'View Project',
  },
]

const myDefinedSkills = [
  { name: 'Vue.js', level: 5 },
  { name: 'JavaScript', level: 4.5 },
  { name: 'Git', level: 4 },
  { name: 'Node.js', level: 4 },
  { name: 'HTML/CSS', level: 4.5 },
  { name: 'React', level: 3.5 },
  { name: 'Python', level: 4 },
]

</script>

<template>
  <div class="projects-section">
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title">
          Hello, I'm<br>
          <span class="hero-name">Rebecca Bracho</span>
        </h1>
        <p class="hero-subtitle">
          Computer Engineering Student at Universidad Rafael Urdaneta<br>
          Focused on Frontend Development and Learning Everyday.
        </p>
      </div>
      <div class="hero-background">
        <div class="code-overlay"></div>
      </div>

    </div>
    <h2 class="section-title">My Projects</h2>
    <!-- Replace the card-grid with the Carousel component -->
    <CardCarousel :cards="projects" />
  </div>
  <div class="chart">
    <SkillChart :skills="myDefinedSkills" :max-level="5" />
  </div>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.hero-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.hero-text {
  max-width: 600px;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: white;
}

.hero-name {
  color: #ef4444;
  display: block;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  color: #cbd5e1;
  font-weight: 300;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('public/background.jpeg');
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  z-index: -1;
}




.projects-section {
  max-width: 1200px;
  margin: 2rem auto 4rem auto;
  padding: 0 2rem;
}

.section-title {
  font-size: 2.5rem;
  color: var(--color-heading);
  text-align: center;
  margin-bottom: 3rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
  gap: 2rem;
  justify-content: center; 
  align-items: stretch; 
}

@media (max-width: 768px) {
  .projects-section {
    padding: 0 1rem;
    margin-bottom: 3rem;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .card-grid {
    grid-template-columns: 1fr; 
  }
}
</style>