<script setup>

import { useUserStore } from '../stores/user'

const user = useUserStore()

const logout = () => {
    user.logout()
}

</script>

<template>
 
    <nav class="flex justify-around py-8 bg-white border w-full">
        <div>
            <h3 class="text-2xl font-medium text-purple-700">請假系統</h3>
        </div>
        <div  class="flex items-center space-x-8">
 
            <div>Hi, {{ user.getPersonalUserData().name }}</div>

            <RouterLink class="hover:bg-gray-300" v-if="user.isAdminPerson()" to="/">Home</RouterLink>
            <RouterLink class="hover:bg-gray-300" v-if="user.isAdminPerson()" to="/admin">假單管理</RouterLink>           
            <button class="hover:bg-gray-300" @click="logout">Logout</button>
        </div>
       

    </nav>
     
 </template>
 