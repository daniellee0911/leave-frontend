<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import { ref, inject, onMounted,onUnmounted, onUpdated } from 'vue';

import { useUserStore } from '../stores/user'
import axios from 'axios'

const user = useUserStore()

const currentTab = ref('tab1')

const show = (input) => {
  console.log(input)
  currentTab.value = input
}



const leave_id = ref('1')
const start_date = ref('')
const end_date = ref('')
const start_time = ref('')
const end_time = ref('')
const description = ref('')

const errorMessage = ref(null)

const submit = async () =>{
  try{
    await axios.post('/leave/'+leave_id.value+'/request',
    {
      start_date:start_date.value,
      start_time:start_time.value,
      end_date:end_date.value,
      end_time:end_time.value,
      description:description.value
    })
    location.reload()
    alert('成功送出')
  }catch(err){
    console.log(err)
    if(err.response.data.message==='Unauthenticated.'){
        user.logout()
    } 
    errorMessage.value = err.response.data.message
  }
  
}

const selectTime1 = ref([])
const selectTime2 = ref([])
const getSelectTime = async () => {
  try{
    const res = await axios.get('/leave/selectTime')
    selectTime1.value = res.data;
    selectTime2.value = res.data;
  }catch(err){
    console.log(err)
    if(err.response.data.message==='Unauthenticated.'){
        user.logout()
    } 
    errorMessage.value = err.response.data.message
  }
  
}

getSelectTime()
</script>


<template>
  <main>
    
    <!-- <div>
      <button @click="show('tab1')">請假</button>
      <button @click="show('tab2')">個人紀錄</button>
    </div>
    <div v-if="currentTab==='tab1'">tab1</div>
    <div v-if="currentTab==='tab2'">tab2</div> -->
    <div class="relative flex flex-col items-center mt-20 min-h-screen">
      <div v-if="errorMessage" class=" my-2 w-48   shadow">
             <p class="text-sm text-red-600">
               {{ errorMessage }}
             </p>
           </div>
    
      <div class="w-full p-6 shadow bg-gray-50 lg:max-w-md">
        <h1 class="text-3xl font-semibold text-center text-purple-700 py-4">填寫假單</h1>
        <form class="space-y-4" @submit.prevent="submit">
          <div class="flex">
            <p class="w-32">假別</p>
            <select name="leave_id"  v-model="leave_id"
            class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md 
            focus:border-purple-400 focus:ring-purple-300 focus:outline-none 
            focus:ring focus:ring-opacity-40">
              <option value="1">病假</option>
              <option value="2">事假</option>
              <option value="3">特休假</option>
              <option value="4">公假</option>
            </select>
          </div>
          <div class="flex">
            <p class="w-32">開始日期</p>
            <input
              type="date"
              name="start_date"
              v-model="start_date"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            
          </div>   

          <div class="flex">
            <p class="w-32">開始時間</p>
            <select name="leave_id"  v-model="start_time"
            class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md 
            focus:border-purple-400 focus:ring-purple-300 focus:outline-none 
            focus:ring focus:ring-opacity-40">
              
            <option  v-for="time in selectTime1" :value="time">{{ time }}</option>
             
             
            </select>
            
          </div>
          
          <div class="flex">
            <p class="w-32">結束日期</p>
            <input
              type="date"
              name="end_date"
              v-model="end_date"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            
          </div>   
        
          <div class="flex">
            
            <p class="w-32">結束時間</p>
            <select name="leave_id"  v-model="end_time"
            class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md 
            focus:border-purple-400 focus:ring-purple-300 focus:outline-none 
            focus:ring focus:ring-opacity-40">
            <option  v-for="time in selectTime2" :value="time">{{ time }}</option>
             
            </select>
          
          </div>

          <div>
            
            <textarea name="description" placeholder="請假的原因是..."  v-model="description"
            rows="5" cols="40"></textarea>

          </div>

          <div>
            <button
              type="submit"
              class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              送出假單
            </button>
          </div>
        </form>
      
      </div>
    </div>

  </main>
</template>

