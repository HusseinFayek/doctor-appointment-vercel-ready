<template>
  <section>
    <h2 class="text-2xl font-semibold mb-4">My Appointments</h2>
    <div v-if="state.appointments.length===0" class="p-4 bg-white rounded-md">No appointments yet. <router-link to="/doctors" class="text-indigo-600">Find doctors</router-link></div>
    <div class="mt-4 space-y-3">
      <div v-for="a in sorted" :key="a.id" class="card flex justify-between items-center gap-4">
        <div>
          <div class="font-semibold">{{ a.doctorName }} — {{ a.specialty }}</div>
          <div class="text-sm text-gray-500">{{ a.date }} at {{ a.time }}</div>
          <div class="text-sm text-gray-400">Booked for {{ a.patient.name }} ({{ a.patient.phone }})</div>
          <div v-if="countdowns[a.id]" class="mt-2 text-yellow-600">Starts in {{ countdowns[a.id] }}</div>
        </div>
        <div class="flex flex-col gap-2">
          <router-link :to="`/booking/${a.doctorId}`" class="btn btn-outline">Book again</router-link>
          <button @click="cancel(a.id)" class="btn">Cancel</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from '../store'
const { state, cancelAppointment } = useStore()
const sorted = computed(()=> [...state.appointments].sort((a,b)=> new Date(`${a.date}T${a.time}:00`) - new Date(`${b.date}T${b.time}:00`)))
const countdowns = reactive({})
let timerId = null
function updateCountdowns(){ const now=new Date(); sorted.value.forEach(a=>{ const dt=new Date(`${a.date}T${a.time}:00`); const diff = dt-now; if(diff>0 && diff<=24*3600*1000){ const hrs=Math.floor(diff/3600000); const mins=Math.floor((diff%3600000)/60000); const secs=Math.floor((diff%60000)/1000); countdowns[a.id] = `${hrs}h ${mins}m ${secs}s` } else { delete countdowns[a.id] } }) }
onMounted(()=>{ timerId = setInterval(updateCountdowns,1000); updateCountdowns() })
onBeforeUnmount(()=>{ if(timerId) clearInterval(timerId) })
function cancel(id){ if(confirm('Cancel this appointment?')) cancelAppointment(id) }
</script>
