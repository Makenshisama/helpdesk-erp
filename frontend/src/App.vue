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
  background-color: #535353;
  font-family: Arial, sans-serif;
  color: #ffffff; /* cor padrão dos textos */
  font-weight: 600;
}

.layout {
  min-height: 100vh;
}

.content {
  margin-left: 240px; 
  padding: 30px;
  min-height: 100vh;
}


html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
}

</style>
