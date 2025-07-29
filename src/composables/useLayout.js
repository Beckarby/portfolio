// composables/useLayout.js
import { computed, ref, watchEffect } from "vue";

// Use a global state for the layout settings,
// possibly initialized from localStorage or a default
const appState = ref({
  // Initialize dark mode based on a saved preference or default to true
  // For demonstration, let's keep it true by default
  darkMode: true,
});

export function useLayout() {
  // Function to apply/remove the 'p-dark' class
  function applyDarkModeClass(isDark) {
    if (isDark) {
      document.documentElement.classList.add("p-dark");
    } else {
      document.documentElement.classList.remove("p-dark");
    }
  }

  // Toggles the dark mode state and applies the class
  function toggleDarkMode() {
    appState.value.darkMode = !appState.value.darkMode;
    // You could also save this preference to localStorage here
    // localStorage.setItem('isDarkMode', appState.value.darkMode);
  }

  // Reactive computed property for current dark mode status
  const isDarkMode = computed(() => appState.value.darkMode);

  // Use watchEffect to reactively apply the dark mode class
  // whenever appState.value.darkMode changes.
  // This also runs once immediately on component setup.
  watchEffect(() => {
    applyDarkModeClass(appState.value.darkMode);
  });

  return {
    isDarkMode,
    toggleDarkMode,
    // If you need to programmatically set dark mode (e.g., from a setting page)
    setDarkMode: (value) => {
      appState.value.darkMode = value;
    },
  };
}