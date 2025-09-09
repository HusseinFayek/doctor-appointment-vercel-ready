<template>
  <header class="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="bg-white/20 rounded-full p-2">📅</div>
        <div>
          <h1 class="text-lg font-semibold">DocBook</h1>
          <p class="text-sm opacity-90">Find & book trusted doctors</p>
        </div>
      </div>
      <nav class="flex items-center gap-4 text-sm">
        <router-link to="/" class="hover:underline">Home</router-link>
        <router-link to="/doctors" class="hover:underline">Doctors</router-link>
        <router-link to="/my-appointments" class="hover:underline">My Appointments</router-link>
        <router-link to="/contact" class="hover:underline">Contact</router-link>
        <router-link to="/doctor-login" class="hover:underline">Doctor</router-link>
        <button @click="$emit('toggle')" class="ml-4 px-3 py-1 bg-white/20 rounded">Theme</button>
      </nav>
    </div>
  </header>
</template>
