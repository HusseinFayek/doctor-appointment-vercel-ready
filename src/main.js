import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
const theme = localStorage.getItem('theme')||'light'
if(theme==='dark') document.documentElement.classList.add('dark')
createApp(App).use(router).mount('#app')
