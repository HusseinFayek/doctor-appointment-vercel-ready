import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Doctors from '../views/Doctors.vue'
import Booking from '../views/Booking.vue'
import MyAppointments from '../views/MyAppointments.vue'
import Contact from '../views/Contact.vue'
import DoctorLogin from '../views/DoctorLogin.vue'
import DoctorDashboard from '../views/DoctorDashboard.vue'
const routes=[{path:'/',component:Home},{path:'/doctors',component:Doctors},{path:'/booking/:id',component:Booking,props:true},{path:'/my-appointments',component:MyAppointments},{path:'/contact',component:Contact},{path:'/doctor-login',component:DoctorLogin},{path:'/doctor-dashboard',component:DoctorDashboard}]
export default createRouter({history:createWebHistory(),routes})
