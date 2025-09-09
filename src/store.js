import { reactive, computed } from 'vue'
import doctorsData from './data/doctors'
const savedAppointments = JSON.parse(localStorage.getItem('appointments')||'[]')
const savedTheme = localStorage.getItem('theme')||'light'
const savedAuth = JSON.parse(localStorage.getItem('doctorAuth')||'null')
const state = reactive({doctors:doctorsData,appointments:savedAppointments,theme:savedTheme,doctorAuth:savedAuth})
function persist(){localStorage.setItem('appointments',JSON.stringify(state.appointments))}
export function useStore(){const upcomingAppointments = computed(()=>{const now=new Date();return state.appointments.map(a=>({...a,dt:new Date(`${a.date}T${a.time}:00`)})).filter(a=>a.dt>=now).sort((a,b)=>a.dt-b.dt)})
function bookAppointment(payload){const exists=state.appointments.some(a=>a.doctorId===payload.doctorId&&a.date===payload.date&&a.time===payload.time);if(exists) throw new Error('Slot already booked');state.appointments.push({id:crypto.randomUUID(),...payload});persist()}
function cancelAppointment(id){const idx=state.appointments.findIndex(a=>a.id===id);if(idx!==-1){state.appointments.splice(idx,1);persist()}}
function toggleTheme(){state.theme=state.theme==='dark'?'light':'dark';localStorage.setItem('theme',state.theme);document.documentElement.classList.toggle('dark',state.theme==='dark')}
function loginDoctor(username,password){if(username==='doctor'&&password==='password123'){state.doctorAuth={username};localStorage.setItem('doctorAuth',JSON.stringify(state.doctorAuth));return true}return false}
function logoutDoctor(){state.doctorAuth=null;localStorage.removeItem('doctorAuth')}
return {state,upcomingAppointments,bookAppointment,cancelAppointment,toggleTheme,loginDoctor,logoutDoctor}}
