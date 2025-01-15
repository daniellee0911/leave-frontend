<script setup>
import { ref, inject, onMounted,onUnmounted, onUpdated } from 'vue';

import { useRouter } from 'vue-router';
const router = useRouter();

import { useUserStore } from '../stores/user'
const user = useUserStore()

const email = ref('')
const password = ref('')

const submit = () =>{
    user.login({email:email.value,password:password.value})
}


</script>
<template>
    
    <div class="relative flex flex-col items-center justify-center min-h-screen">
    
     <div v-if="!user.errors && user.errorMessage && user.errorMessage!=='Unauthenticated.'" class=" my-2 w-48   shadow">
             <p class="text-sm text-red-600">
               {{ user.errorMessage }}
             </p>
           </div>
     <div class="w-full p-6 shadow bg-gray-50 lg:max-w-md">
       <h1 class="text-3xl font-semibold text-center text-purple-700">請假系統</h1>
       <form class="space-y-4" @submit.prevent="submit">
         <div>
           <label for="email" class="block text-sm text-gray-800">Email</label>
           <input
             type="email"
             name="email"
             v-model="email"
             class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
           />
           <div v-if="user.errors && user.errors.email">
             <p class="text-sm text-red-600">
               {{ user.errors.email[0] }}
             </p>
           </div>
         </div>
        
         <div>
          
  
  
           <label for="password" class="block text-sm text-gray-800 ">Password</label>
           <!-- <button type="button"  class="text-white rounded-md w-16 bg-indigo-500 hover:bg-indigo-300" @click="showPassword = !showPassword">
             {{ showPassword ? 'Hide' : 'Show' }}
           </button> -->
          
           <input
             type="password"
             name="password"
             v-model="password"
             class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
           />
           <div v-if="user.errors && user.errors.password">
             <p class="text-sm text-red-600 ">
               {{ user.errors.password[0] }}
             </p>
           </div>
         </div>
       
         <div>
           <button
             type="submit"
             class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
           >
             Login
           </button>
         </div>
       </form>
     
     </div>
   </div>
  </template>