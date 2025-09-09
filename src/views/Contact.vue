<template>
  <section class="max-w-2xl">
    <h2 class="text-2xl font-semibold mb-4">Contact</h2>
    <form class="space-y-3 bg-white rounded p-4" @submit.prevent="submit">
      <input v-model="form.name" placeholder="Name" required class="input" />
      <input v-model="form.email" placeholder="Email" type="email" required class="input" />
      <textarea v-model="form.message" placeholder="Message" rows="5" required class="input"></textarea>
      <button class="btn btn-primary">Send</button>
      <div v-if="sent" class="text-green-600">Thanks! We'll get back to you.</div>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
const form = reactive({ name:'', email:'', message:'' })
const sent = ref(false)
function submit(){ sent.value = true; setTimeout(()=> sent.value=false, 3000); form.name=''; form.email=''; form.message='' }
</script>
