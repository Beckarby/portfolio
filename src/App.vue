<script setup>
import { onMounted } from 'vue';
import { useAuth } from './composables/useAuth';
import Navbar from './components/navbar.vue';
import Footer from './components/footer.vue';

const { initAuth } = useAuth();

onMounted(async () => {
  await initAuth();
});
</script>

<template>
  <div id="app-container">
    <Navbar />
    <main class="main-content">
      <router-view />
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