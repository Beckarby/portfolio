<script setup>
import { useAuth } from '../composables/useAuth';
import { useLayout } from '../composables/useLayout';
import { logout } from '../auth';
import { useRouter, useRoute } from 'vue-router';
import { Moon, Sun } from 'lucide-vue-next'; 

const { user } = useAuth();
const { isDarkMode, toggleDarkMode } = useLayout();
const router = useRouter();
const route = useRoute();

const handleLogout = async () => {
  try {
    await logout();
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <router-link to="/" class="brand-link">
          <span class="brand-text">Beckarby's Portafolio</span>
        </router-link>
      </div>

      <div class="nav-links">
        <template v-if="user">
          <div class="user-menu">
            <span class="user-email">Hello, {{ user.email.split('@')[0] }}!</span>

            <button @click="handleLogout" class="logout-btn">
              Logout
            </button>
          </div>
        </template>
        <template v-else>
          <div class="auth-links">
            <router-link to="/login" class="nav-link">Login</router-link>
            <router-link to="/signup" class="nav-link signup-link">Sign Up</router-link>
          </div>
        </template>

        <!-- <button @click="toggleDarkMode" class="theme-toggle" :class="{ 'dark': isDarkMode }">
          <span v-if="isDarkMode">
            <Moon />
          </span>
          <span v-else>
            <Sun />
          </span>
        </button> -->
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: transparent;
  border-bottom: 1px solid var(--surface-border);
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
}

.nav-brand .brand-link {
  text-decoration: none;
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 700;
}

.brand-text {
  background: var(--text-color);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-email {
  color: var(--text-color);
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

.auth-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
  color: var(--text-color);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  background: var(--surface-hover);
  color: var(--primary-color);
}

.signup-link {
  background: var(--primary-color);
  color: white !important;
}

.signup-link:hover {
  background: var(--primary-color-text);
  transform: translateY(-1px);
}

.logout-btn {
  background: var(--red-500);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: var(--red-600);
  transform: translateY(-1px);
}

.theme-toggle {
  background: transparent;
  border: transparent;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: black;
}

.theme-toggle:hover {
    background: var(--surface-hover);
    transform: scale(1.1);
}

.theme-toggle.dark {
  color: white;
}


@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }
  
  .user-email {
    display: none;
  }
  
  .nav-links {
    gap: 0.5rem;
  }
  
  .nav-link, .logout-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>