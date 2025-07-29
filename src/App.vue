<script setup>
import { onMounted } from 'vue';
import { useAuth } from './composables/useAuth';
import Navbar from './components/navbar.vue';
import Footer from './components/footer.vue';
import SkillChart from './components/SkillChart.vue';

const { initAuth } = useAuth();

const myDefinedSkills = [
  { name: 'Vue.js', level: 5 },
  { name: 'JavaScript', level: 4.5 },
  { name: 'Git', level: 4 },
  { name: 'Node.js', level: 4 },
  { name: 'HTML/CSS', level: 4.5 },
  { name: 'React', level: 3.5 },
  { name: 'Angular', level: 4 },
  { name: 'Python', level: 4 },
]

onMounted(async () => {
  await initAuth();
});
</script>

<template>
  <div id="app-container">
    <Navbar />
    <main class="main-content">
      <router-view />
      <div class="chart">
        <SkillChart :skills="myDefinedSkills" :max-level="5" />
      </div>
    </main>
    <Footer />
  </div>
</template>

<style>
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
}


html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>