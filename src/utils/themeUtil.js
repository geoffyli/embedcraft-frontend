import { ref } from 'vue';
import { useLayout } from '@/layout/composables/layout';

// Extract relevant functions and state from the useLayout composable
const { changeThemeSettings, setScale, layoutConfig } = useLayout();

// Available scales (font sizes) for the application
const scales = ref([12, 13, 14, 15, 16]);

/**
 * Change the application's theme and mode.
 * 
 * @param {string} theme - The name of the new theme to apply.
 * @param {string} mode - The mode (either "light" or "dark") to apply.
 */
const onChangeTheme = (theme, mode) => {
  const elementId = "theme-css";
  const linkElement = document.getElementById(elementId);
  const cloneLinkElement = linkElement.cloneNode(true);

  // Replace the current theme URL with the new theme URL
  const newThemeUrl = linkElement
    .getAttribute("href")
    .replace(layoutConfig.theme.value, theme);

  cloneLinkElement.setAttribute("id", elementId + "-clone");
  cloneLinkElement.setAttribute("href", newThemeUrl);

  // Update theme settings after the new theme is fully loaded
  cloneLinkElement.addEventListener("load", () => {
    linkElement.remove();
    cloneLinkElement.setAttribute("id", elementId);
    changeThemeSettings(theme, mode === "dark");
  });

  // Insert the new theme link element
  linkElement.parentNode.insertBefore(
    cloneLinkElement,
    linkElement.nextSibling
  );

  // Store the selected theme and mode in local storage
  localStorage.setItem("selected-theme", theme);
  localStorage.setItem("selected-mode", mode);
};

/**
 * Decrease the scale (font size) by one unit.
 */
const decrementScale = () => {
  setScale(layoutConfig.scale.value - 1);
  applyScale();
};

/**
 * Increase the scale (font size) by one unit.
 */
const incrementScale = () => {
  setScale(layoutConfig.scale.value + 1);
  applyScale();
};

/**
 * Apply the current scale (font size) to the document.
 */
const applyScale = () => {
  document.documentElement.style.fontSize = layoutConfig.scale.value + "px";
  localStorage.setItem("scale", layoutConfig.scale.value);
};

/**
 * Set the application's theme and scale based on stored preferences.
 */
const setThemeAndScale = () => {
  const storedTheme = localStorage.getItem("selected-theme");
  const storedMode = localStorage.getItem("selected-mode");
  const scale = localStorage.getItem("scale");

  // Apply the stored theme and mode if they exist
  if (storedTheme && storedMode) {
    onChangeTheme(storedTheme, storedMode);
  }

  // Apply the stored scale if it exists
  if (scale) {
    setScale(parseInt(scale));
  }

  applyScale();
};

// Export the available functions and scales for use in other parts of the application
export {
  scales,
  onChangeTheme,
  decrementScale,
  incrementScale,
  setThemeAndScale,
  applyScale,
};
