<template>
  <section>
    <div class="flex flex-col md:flex-row gap-4 mb-6 items-center">
      <input v-model="q" placeholder="Search by name or specialty..." class="input" />
      <select v-model="specialty" class="input w-60">
        <option value="">All Specialties</option>
        <option v-for="s in specialties" :key="s" :value="s">{{ s }}</option>
      </select>
      <select v-model.number="perPage" class="input w-40">
        <option :value="6">6 per page</option>
        <option :value="9">9 per page</option>
        <option :value="12">12 per page</option>
      </select>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DoctorCard v-for="d in paginated" :key="d.id" :doctor="d" />
    </div>

    <div class="mt-8 flex justify-center items-center gap-4">
      <button @click="page--" :disabled="page===1" class="btn">Previous</button>
      <div>Page {{ page }} / {{ totalPages }}</div>
      <button @click="page++" :disabled="page===totalPages" class="btn">Next</button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from '../store'
import DoctorCard from '../components/DoctorCard.vue'
const { state } = useStore()
const q = ref('')
const specialty = ref('')
const perPage = ref(6)
const page = ref(1)
const specialties = computed(()=> Array.from(new Set(state.doctors.map(d=>d.specialty))))
const filtered = computed(()=>{
  const term = q.value.trim().toLowerCase()
  return state.doctors.filter(d=>{
    const matchesQ = !term || d.name.toLowerCase().includes(term) || d.specialty.toLowerCase().includes(term)
    const matchesS = !specialty.value || d.specialty===specialty.value
    return matchesQ && matchesS
  })
})
const totalPages = computed(()=> Math.max(1, Math.ceil(filtered.value.length / perPage.value)))
const paginated = computed(()=>{ if(page.value>totalPages.value) page.value = totalPages.value; const start=(page.value-1)*perPage.value; return filtered.value.slice(start,start+perPage.value) })
</script>
