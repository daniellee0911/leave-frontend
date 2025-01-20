<script setup>
import { ref, reactive, onMounted,  onUpdated} from 'vue';

import axios from 'axios'
import { useUserStore } from '../stores/user'
const user = useUserStore()


const props = defineProps({
   url: {
       type: String,
       default: '',
   },
});


// console.log(props.url)
const emits = defineEmits(["paginationData"]);


const responseData = ref(null)


const getPaginationData = async(url) =>{

    try{
        const res = await axios.get(url)
        responseData.value = res.data
    }catch(err){
        console.log(err)
        if(err.response.data.message==='Unauthenticated.'){
            user.logout()
        } 
    }
}


getPaginationData(props.url)




onUpdated(() => {
  
   emits('paginationData', responseData.value.data)
  
})
</script>


<template >
  


   <div v-if="responseData && responseData.links.length > 3">
       <template v-for="link in responseData.links">
           <button v-if="link.url === null" class=" mr-1 mb-1 px-4 py-3 text-sm
           leading-4 text-gray-400 border rounded cursor-not-allowed"
               v-html="link.label" />
           <button v-else
               class="mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded"
               :class="{ 'bg-indigo-500': link.active }"  v-html="link.label"
               @click="getPaginationData(link.url)"/>
      
       </template>
   </div>
 
  
</template>
