import {ref} from 'vue';
import { useLayout } from '@/layout/composables/layout';
const { changeThemeSettings, setScale, layoutConfig } = useLayout();


const scales = ref([12, 13, 14, 15, 16]);

const onChangeTheme = (theme, mode) => {
    const elementId = "theme-css";
    const linkElement = document.getElementById(elementId);
    const cloneLinkElement = linkElement.cloneNode(true);
    const newThemeUrl = linkElement
        .getAttribute("href")
        .replace(layoutConfig.theme.value, theme);
    cloneLinkElement.setAttribute("id", elementId + "-clone");
    cloneLinkElement.setAttribute("href", newThemeUrl);
    cloneLinkElement.addEventListener("load", () => {
        linkElement.remove();
        cloneLinkElement.setAttribute("id", elementId);
        changeThemeSettings(theme, mode === "dark");
    });
    linkElement.parentNode.insertBefore(
        cloneLinkElement,
        linkElement.nextSibling
    );

    localStorage.setItem("selected-theme", theme);
    localStorage.setItem("selected-mode", mode);
};
const decrementScale = () => {
    setScale(layoutConfig.scale.value - 1);
    applyScale();
};
const incrementScale = () => {
    setScale(layoutConfig.scale.value + 1);
    applyScale();
};
const applyScale = () => {
    document.documentElement.style.fontSize = layoutConfig.scale.value + "px";
    localStorage.setItem("scale", layoutConfig.scale.value);
};

const setThemeAndScale = () => {
    const storedTheme = localStorage.getItem("selected-theme");
    const storedMode = localStorage.getItem("selected-mode");
    const scale = localStorage.getItem("scale");
    if (storedTheme && storedMode) {
        onChangeTheme(storedTheme, storedMode);
    }
    if (scale) {
        setScale(parseInt(scale));
    }
    applyScale();
};

export {
    scales,
    onChangeTheme,
    decrementScale,
    incrementScale,
    setThemeAndScale,
    applyScale,
}