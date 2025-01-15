<script setup>



</script>

<template>
 
    <nav class="flex justify-around py-8 bg-white border w-full">
        <div>
            <h3 class="text-2xl font-medium text-purple-700">請假系統</h3>
        </div>
        <div  class="flex items-center space-x-8">
 
            <div>Hi, xxx</div>

            <RouterLink class="hover:bg-gray-300"  to="/">Home</RouterLink>
            <RouterLink class="hover:bg-gray-300"  to="/admin">假單管理</RouterLink>           
            <button class="hover:bg-gray-300" >Logout</button>
        </div>
       

    </nav>
     
 </template>
 