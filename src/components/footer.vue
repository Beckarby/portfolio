<script setup></script>

<template>
  <footer class="app-footer">
    <div class="footer-content">
      <p class="footer-text">
        &copy; 2025 Rebecca Bracho. Frameworks Periodo B
      </p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: transparent; 
  color: var(--text-color);
  border-radius: 8px;
  text-align: center;
  padding: 1.5rem; 
  border-top: 1px solid var(--surface-border); 
  backdrop-filter: blur(10px);

}

.footer-content {
  max-width: 1200px; 
  margin: 0 auto; 
}

.footer-text {
  font-size: 0.875rem; 
  margin: 0; 
  line-height: 1.5;
}

@media (max-width: 768px) {
  .app-footer {
    padding: 1rem;
  }
}
</style>