<template>
  <section class="max-w-md">
    <h2 class="text-2xl font-semibold mb-4">Doctor Login</h2>
    <form class="space-y-3 bg-white rounded p-4" @submit.prevent="login">
      <input v-model="username" placeholder="Username" required class="input" />
      <input v-model="password" placeholder="Password" type="password" required class="input" />
      <button class="btn btn-primary">Login</button>
      <div v-if="error" class="text-red-600">{{ error }}</div>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'
const { loginDoctor } = useStore()
const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')
function login(){ if(loginDoctor(username.value,password.value)){ router.push('/doctor-dashboard') } else { error.value = 'Invalid credentials (hint: doctor/password123)' } }
</script>
