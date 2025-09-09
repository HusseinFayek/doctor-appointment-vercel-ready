<template>
  <section v-if="doctor">
    <div class="grid md:grid-cols-2 gap-6">
      <div class="card">
        <img :src="doctor.photo" class="w-full h-56 object-cover rounded-md mb-3" />
        <h3 class="text-xl font-semibold">{{ doctor.name }}</h3>
        <p class="text-indigo-600">{{ doctor.icon }} {{ doctor.specialty }}</p>
        <p class="text-sm text-gray-500">{{ doctor.location }}</p>
      </div>
      <form class="card" @submit.prevent="submit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input v-model="form.name" placeholder="Patient name" required class="input" />
          <input v-model="form.phone" placeholder="Phone" required pattern="^[0-9+\-\s]{6,}$" class="input" />
          <input v-model="form.email" placeholder="Email" type="email" required class="input" />
          <input v-model="form.date" type="date" :min="today" class="input" />
          <select v-model="form.time" class="input" required>
            <option value="" disabled>Select time</option>
            <option v-for="t in availableTimes" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>
        <div class="mt-4 flex gap-3">
          <button class="btn btn-primary" :disabled="!canSubmit">Confirm</button>
          <router-link to="/doctors" class="btn">Back</router-link>
        </div>
        <div v-if="message" class="mt-3 text-green-600">{{ message }}</div>
      </form>
    </div>
  </section>
  <section v-else>
    <p>Doctor not found</p>
  </section>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '../store'
const { state, bookAppointment } = useStore()
const route = useRoute()
const doctor = state.doctors.find(d=>d.id===Number(route.params.id))
const today = new Date().toISOString().slice(0,10)
const form = reactive({ name:'', phone:'', email:'', date: today, time: '' })
const bookedTimesForDate = computed(()=> state.appointments.filter(a=>a.doctorId===doctor?.id && a.date===form.date).map(a=>a.time))
const availableTimes = computed(()=> doctor ? doctor.availableSlots.filter(t=>!bookedTimesForDate.value.includes(t)) : [])
const canSubmit = computed(()=> form.name && form.phone && form.email && form.date && form.time)
const message = ref('')
function submit(){ try{ bookAppointment({ doctorId: doctor.id, doctorName: doctor.name, specialty: doctor.specialty, date: form.date, time: form.time, patient: { name: form.name, phone: form.phone, email: form.email } }); message.value = 'Appointment confirmed!'; form.time=''; } catch(e){ alert(e.message) } }
</script>
