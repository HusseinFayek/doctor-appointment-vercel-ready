<template>
  <div>
    <Header @toggle="store.toggleTheme" />
    <main class="max-w-6xl mx-auto px-6 py-10">
      <router-view />
    </main>
    <footer class="border-t py-6 text-center text-sm text-gray-500">&copy; {{ year }} DocBook</footer>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import { useStore } from './store'
const store = useStore()
const year = new Date().getFullYear()
</script>
