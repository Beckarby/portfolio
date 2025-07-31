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
    title: 'SoundPlayer',
    description: 'modern, minimalistic music player application built with Vue.js and PrimeVue. manage playlists, your audio files, and enjoy seamless playback - all locally within your browser.',
    imageUrl: '/public/SoundPlayer.png',
    linkUrl: 'https://sound-player-tau.vercel.app',
    linkText: 'View Project',
  },
  {
    id: 2,
    title: 'Notepad',
    description: 'Basic notepad in React, manage your notes with ease. Create, edit, and delete notes.',
    imageUrl: '/public/notepad.png',
    linkUrl: 'https://notepad-three-theta.vercel.app',
    linkText: 'View Project',
  },
  {
    id: 3,
    title: 'Money Base',
    description: 'Basic personal finance management application built with Vanilla JavaScript. Track your expenses, income, and savings all of this locally within your browser.',
    imageUrl: '/public/money-base.png',
    linkUrl: 'https://money-base.vercel.app',
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
  <div class="hero-section">
    <div class="hero-background"></div>
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
    </div>
  </div>

  <div class="projects-section">
    <h2 class="section-title">My Projects</h2>
    <CardCarousel :cards="projects" />
  </div>

  <div class="chart">
    <SkillChart :skills="myDefinedSkills" :max-level="5" />
  </div>
</template>

<style scoped>
.hero-section {
  position: relative; 
  padding: 3.5rem 2rem;
  background-color: #000000; 
  color: white;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/public/background.jpeg');
  background-size: cover;
  background-position: center;
  filter: blur(12px); 
  z-index: 1; 
}

.hero-content {
  position: relative; 
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
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

.projects-section {
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
}

.section-title {
  font-size: 2.5rem;
  color: var(--color-heading);
  text-align: center;
  margin-bottom: 3rem;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 6rem 1rem;
  }
  .projects-section {
    padding: 0 1rem;
    margin: 3rem auto;
  }
  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
}
</style>