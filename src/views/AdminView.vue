<script setup>
import { ref,reactive, inject, onMounted,onUnmounted, onUpdated } from 'vue';

import axios from 'axios'
import { useRouter } from 'vue-router';
const router = useRouter();

import { useUserStore } from '../stores/user'
const user = useUserStore()

import Pagination from '@/components/Pagination.vue';

import Modal from '@/components/Modal.vue';


const paginationUrl = '/leaves/request'

const paginationData = ref([])

const getPaginationData = (res) => {
    console.log(res)
    paginationData.value = res
}

const isOpen = ref(false);

const leaveData = ref(null)
const clickButton = (data) => {
    isOpen.value = ! isOpen.value
    leaveData.value = data
}

</script>

<template>
 <div>
    <Modal  v-model="isOpen"  :data="leaveData"/>
 </div>   

<!-- <div>{{ leaveData }}</div> -->
<div class="relative flex flex-col items-center mt-20  mx-24">
    <div class="w-full p-6 shadow bg-gray-50 z-0">
        <h1 class="text-3xl font-semibold text-center text-purple-700 py-4">待簽核假單</h1>
        <table class="border-collapse border text-center">
            <thead>
                <tr>
                    <th class="border w-24">姓名</th>
                    <th class="border w-24">假別</th>
                    <th class="border w-24">開始期日</th>
                    <th class="border w-24">開始時間</th>
                    <th class="border w-24">結束期日</th>
                    <th class="border w-24">結束時間</th>
                    <th class="border w-24"></th>
                </tr>
            </thead>
            <tbody v-if="paginationData">
                <tr v-for="data in paginationData">
                    <td class="border text-center w-24">{{data.user.name}}</td>
                    <td class="border text-center w-24">{{data.leave.name}}</td>
                    <td class="border text-center w-24">{{data.start_date}}</td>
                    <td class="border text-center w-24">{{data.start_time}}</td>
                    <td class="border text-center w-24">{{data.end_date}}</td>
                    <td class="border text-center w-24">{{data.end_time}}</td>
                    <td class="border text-center w-24"><button @click="clickButton(data)">簽核</button></td>
                    
                </tr>
            </tbody>   
        </table>
        <Pagination :url="paginationUrl" @paginationData="getPaginationData"></Pagination>
    </div>
</div>

   

</template>
<style>
  /* .admin {
    line-height: 1.2;
    text-align: center;
    font-family: "Oswald", sans-serif;
    padding: 80px 20px;
  }
  .admin >.status {
      font-size: 100px;
      color: greenyellow;
    } */
 
  
</style>