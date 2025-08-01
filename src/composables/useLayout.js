import { computed, ref, watchEffect } from "vue";

const appState = ref({
  darkMode: true,
});

export function useLayout() {
  function applyDarkModeClass(isDark) {
    if (isDark) {
      document.documentElement.classList.add("p-dark");
    } else {
      document.documentElement.classList.remove("p-dark");
    }
  }

  function toggleDarkMode() {
    appState.value.darkMode = !appState.value.darkMode;
  }

  const isDarkMode = computed(() => appState.value.darkMode);

  watchEffect(() => {
    applyDarkModeClass(appState.value.darkMode);
  });

  return {
    isDarkMode,
    toggleDarkMode,
    setDarkMode: (value) => {
      appState.value.darkMode = value;
    },
  };
}