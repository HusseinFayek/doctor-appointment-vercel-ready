<template>
  <section>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-semibold">Doctor Dashboard</h2>
      <div class="flex gap-2">
        <button @click="logout" class="btn">Logout</button>
      </div>
    </div>
    <div class="card">
      <h3 class="font-semibold mb-3">Upcoming Appointments</h3>
      <div v-if="upcoming.length===0" class="text-gray-500">No upcoming bookings.</div>
      <ul class="space-y-2">
        <li v-for="a in upcoming" :key="a.id" class="flex justify-between">
          <div>
            <div class="font-medium">{{ a.patient.name }}</div>
            <div class="text-sm text-gray-500">{{ a.patient.phone }} — {{ a.patient.email }}</div>
          </div>
          <div class="text-sm text-gray-600">{{ a.date }} {{ a.time }}</div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'
const router = useRouter()
const { state, upcomingAppointments, logoutDoctor } = useStore()
if(!state.doctorAuth) router.replace('/doctor-login')
const upcoming = computed(()=> upcomingAppointments.value)
function logout(){ logoutDoctor(); router.replace('/doctor-login') }
</script>
