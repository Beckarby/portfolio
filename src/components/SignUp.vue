<script setup>
import { ref, computed } from 'vue';
import { signUp } from '../auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();

const isFormValid = computed(() => {
  return email.value && 
         password.value && 
         confirmPassword.value && 
         password.value === confirmPassword.value &&
         password.value.length >= 6;
});

const handleSignUp = async () => {
  error.value = '';
  
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match';
    return;
  }
  
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters';
    return;
  }
  
  loading.value = true;
  
  try {
    await signUp(email.value, password.value);
    router.push('/dashboard');
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2 class="auth-title">Create Account</h2>
        <p class="auth-subtitle">Join us today</p>
      </div>

      <form @submit.prevent="handleSignUp" class="auth-form">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input 
            id="email"
            type="email" 
            v-model="email" 
            required 
            class="form-input"
            placeholder="Enter your email"
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input 
            id="password"
            type="password" 
            v-model="password" 
            required 
            class="form-input"
            placeholder="Create a password"
            minlength="6"
          />
        </div>

        <div class="form-group">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input 
            id="confirmPassword"
            type="password" 
            v-model="confirmPassword" 
            required 
            class="form-input"
            placeholder="Confirm your password"
            :class="{ 'input-error': confirmPassword && password !== confirmPassword }"
          />
          <span v-if="confirmPassword && password !== confirmPassword" class="field-error">
            Passwords do not match
          </span>
        </div>

        <button type="submit" class="auth-button" :disabled="loading || !isFormValid">
          <span v-if="loading" class="loading-spinner"></span>
          {{ loading ? 'Creating account...' : 'Sign Up' }}
        </button>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </form>

      <div class="auth-footer">
        <p class="auth-link-text">
          Already have an account? 
          <router-link to="/login" class="auth-link">Sign in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  transition: background-color 0.5s;
}

.auth-card {
  background: var(--color-background-soft);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--color-border);
  transition: all 0.5s;
}

.auth-header {
  text-align: center;
  margin-bottom: 1rem;
}

.auth-title {
  color: var(--color-heading);
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  transition: color 0.5s;
}

.auth-subtitle {
  color: var(--vt-c-text-light-2);
  margin: 0;
  font-size: 1rem;
  transition: color 0.5s;
}

.p-dark .auth-subtitle {
  color: var(--vt-c-text-dark-2);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.form-label {
  color: var(--color-text);
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.5s;
}

.form-input {
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--color-background);
  color: var(--color-text);
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: var(--vt-c-indigo);
  box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
}

.form-input.input-error {
  border-color: #dc2626;
}

.form-input.input-error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-input::placeholder {
  color: var(--vt-c-text-light-2);
  transition: color 0.5s;
}

.p-dark .form-input::placeholder {
  color: var(--vt-c-text-dark-2);
}

.field-error {
  color: #dc2626;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.p-dark .field-error {
  color: #ef4444;
}

.auth-button {
  background: var(--vt-c-indigo);
  color: white;
  border: none;
  padding: 0.875rem 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;
}

.auth-button:hover:not(:disabled) {
  background: #34495e;
  transform: translateY(-1px);
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  background: #fef2f2;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #fecaca;
  font-size: 0.9rem;
  text-align: center;
  transition: all 0.5s;
}

.p-dark .error-message {
  background: #2d1b1b;
  color: #ef4444;
  border-color: #7f1d1d;
}

.auth-footer {
  margin-top: 2rem;
  text-align: center;
}

.auth-link-text {
  color: var(--vt-c-text-light-2);
  margin: 0;
  transition: color 0.5s;
}

.p-dark .auth-link-text {
  color: var(--vt-c-text-dark-2);
}

.auth-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.auth-link:hover {
  text-decoration: underline;
  color: #34495e;
}

@media (max-width: 480px) {
  .auth-container {
    padding: 1rem;
  }
  
  .auth-card {
    padding: 2rem;
  }
  
  .auth-title {
    font-size: 1.5rem;
  }
}
</style>