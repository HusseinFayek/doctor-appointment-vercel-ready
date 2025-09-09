<template>
  <div class="card flex flex-col">
    <img :src="doctor.photo" class="w-full h-88 object-cover rounded-md mb-3" />
    <div class="flex items-center justify-between">
      <div>
        <h3 class="font-semibold">{{ doctor.name }}</h3>
        <div class="text-sm text-indigo-600">{{ doctor.icon }} {{ doctor.specialty }}</div>
        <div class="text-sm text-gray-500">{{ doctor.location }}</div>
      </div>
      <div class="text-right">
        <div class="text-sm text-gray-600">Slots</div>
        <div class="font-medium">{{ doctor.availableSlots.length }}</div>
      </div>
    </div>
    <div class="mt-4 flex gap-2">
      <router-link :to="`/booking/${doctor.id}`" class="btn btn-primary">Book</router-link>
      <button class="btn btn-outline" @click="$emit('view', doctor.id)">Details</button>
    </div>
  </div>
</template>
<script setup>
defineProps({ doctor: Object })
</script>
