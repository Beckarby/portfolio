<template>
  <div>
    <SignUp v-if="isSignUp" />
    <SignIn v-else />
    <button @click="isSignUp = !isSignUp">
      Switch to {{ isSignUp ? 'Login' : 'Sign Up' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SignUp from './SignUp.vue';
import SignIn from './Login.vue';

const isSignUp = ref(true);
</script>