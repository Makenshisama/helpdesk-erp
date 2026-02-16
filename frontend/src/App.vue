<script setup>
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <div class="layout">
    <Sidebar />

    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  background-color: #383a41; /* 👈 cinza bem clarinho moderno */
  font-family: Arial, sans-serif;
}

.layout {
  display: flex;
  min-height: 100vh; /* 👈 ocupa a tela toda */
}

.content {
  background-color: #5e5e5e;
  margin-left: 240px;
  padding: 30px;
  flex: 1;
}
</style>
