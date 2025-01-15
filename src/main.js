// import './assets/main.css'
import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

axios.defaults.baseURL = 'http://localhost/backend/api'
axios.defaults.headers['Accept'] ='application/json'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
