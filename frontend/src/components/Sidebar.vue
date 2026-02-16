<script setup>
import { ref } from "vue";

const isOpen = ref(true);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div :class="['sidebar', { collapsed: !isOpen }]">
    <button class="toggle" @click="toggleMenu">
      ☰
    </button>

    <nav>
      <router-link to="/" class="nav-item">
        🏠 <span v-if="isOpen">Dashboard</span>
      </router-link>

      <router-link to="/tickets" class="nav-item">
        🎫 <span v-if="isOpen">Tickets</span>
      </router-link>
    
      <router-link to="/clients" class="nav-item">
        👤 <span v-if="isOpen">Clientes</span>
      </router-link>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 240px;
  background: #111827;
  color: white;
  padding: 20px 10px;
  transition: width 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.collapsed {
  width: 70px;
}

.toggle {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  margin-bottom: 30px;
  cursor: pointer;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  text-decoration: none;
  color: #d1d5db;
  transition: 0.2s;
}

.nav-item:hover {
  background: rgba(255,255,255,0.1);
  color: white;
}

.router-link-exact-active {
  background: #2563eb;
  color: white;
}
</style>
