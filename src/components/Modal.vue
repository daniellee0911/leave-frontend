<script setup>
import { ref, computed, onUpdated } from 'vue';
import axios from 'axios'

const props = defineProps(["modelValue","data"])
const emits = defineEmits(["update:modelValue"]);


onUpdated(() => {
   console.log('Modal onUpdated...')
   
})


const Accept = async() => {
    try{
        await axios.post('/leaveRequest/'+props.data.id+'/review',{
            is_allowed:1
        })
        location.reload()
        alert('簽核成功')
    }catch(err){
        console.log(err)
        if(err.response.data.message==='Unauthenticated.'){
            user.logout()
        } 
        if(err.response.status===400){
            alert('不能自己簽核自己')
        }
    }
    
}

const Reject = async() => {
    try{
        await axios.post('/leaveRequest/'+props.data.id+'/review',{
            is_allowed:0
        })
        location.reload()
        alert('簽核成功')
    }catch(err){
        console.log(err)
        if(err.response.data.message==='Unauthenticated.'){
            user.logout()
        } 
        if(err.response.status===400){
            alert('不能自己簽核自己')
        }
       
    }
   
}

const onToggle = () => {
   emits('update:modelValue', !props.modelValue)
}

  
</script>
<style>
.fade-enter,
.fade-leave-to {
 opacity: 0;
}


.fade-enter-active,
.fade-leave-active {
 transition: opacity 500ms ease-out;
}
</style>
<template>
  
   <transition name="fade">
     <div v-if="props.modelValue">
       <div @click="onToggle"
         class="absolute bg-black opacity-70 inset-0 z-10">
       </div>
       <div class="w-full max-w-lg p-3 absolute mx-auto my-auto rounded-xl shadow-lg bg-white z-20">
         <div>
           <div class="text-center p-3 flex-auto justify-center leading-6">
            
             <h2 class="text-2xl font-bold py-4">{{props.data.leave.name}}</h2>
            
             <p class="text-md text-gray-500 px-8">
               申請者：{{ props.data.user.name }}
             </p>
             <p class="text-md text-gray-500 px-8">
               原因：{{ props.data.description }}
             </p>
           </div>
           <div class="p-3 mt-2 text-center space-x-4 md:block">
             <button
               @click="Accept"

               class="mb-2 md:mb-0 bg-green-500 border border-green-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-green-600"
             >
               同意
             </button>
             <button
               @click="Reject"
               class="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-red-600"
             >
               拒絕
             </button>
           </div>
         </div>
       </div>
     </div>
   </transition>




</template>
