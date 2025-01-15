<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue'
import { useUserStore } from './stores/user'
import { ref, inject, onMounted,onUnmounted, onUpdated } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const user = useUserStore()


onMounted(()=>{
  
  console.log('app  onMounted...')
  
})

onUpdated(() => {
  console.log('app  onUpdated...')
 
  if(!user.isAdminPerson() && route.path==='/admin'){
        router.push({path: '/forbidden'})
    }   
})
</script>

<template>
  
  <Navbar v-if="user.getPersonalUserData()"/>
  <RouterView />
</template>

<style>
#app{
  text-align: center;
}
</style>

