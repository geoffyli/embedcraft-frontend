<script setup>
import { ref } from "vue";

import AppMenuItem from "./AppMenuItem.vue";

const model = ref([
  {
    label: "Home",
    items: [
      {
        label: "Dashboard",
        icon: "pi pi-fw pi-chart-bar",
        to: "/main/dashboard",
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        label: "Word Embedding Training",
        icon: "pi pi-fw pi-caret-right",
        to: "/main/trainingSettings",
      },
      {
        label: "Model Detail",
        icon: "pi pi-fw pi-bars",
        to: "/main/modelDetail",
      },
      {
        label: "Stored Word Embeddings",
        icon: "pi pi-fw pi-database",
        to: "/main/storedModels",
      },
    ],
  },
  {
    label: "Settings & Instructions",
    items: [
      { label: "Settings", icon: "pi pi-fw pi-cog", to: "/main/settings" },
      {
        label: "Documentation",
        icon: "pi pi-fw pi-book",
        to: "/main/documentation",
        badge: "NEW",
      },
    ],
  },
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
