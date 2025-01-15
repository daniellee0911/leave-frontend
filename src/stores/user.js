import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router';



export const useUserStore = defineStore('user', () => {
  
  const router = useRouter()

  const user = ref(null)
  
  const errors = ref([])
  const errorMessage = ref(null)

  
  const login = async (input) => {
    errors.value = []
    errorMessage.value = null
    // console.log('login....')

    try{
      const res = await axios.post('/auth/login',input)
      localStorage.setItem("expire_time", res.data.expires_at)
      await fetchPersonalUserData()
      
      router.push({path:'/'})
      
    }catch(err){
      
      if(err.response.data.message==='Unauthenticated.'){
        await logout()
      } 
      errors.value = err.response.data.errors
      errorMessage.value = err.response.data.message
      
    }
    // router.push({path:'/'})
  }

  const logout = async () => {
    errors.value = []
    errorMessage.value = null
    // console.log('logout....')
    try{
      await axios.post('/auth/logout')
    }catch(err){

    }
    finally{
      user.value = null
      localStorage.removeItem('expire_time')
      removeAdminStatus()
      
      router.push({path:'/login'})
    }
    
  }

  const isCookieHasExpired = () => {
    // console.log('isCookieHasExpired....')
    let epire_time =localStorage.getItem('expire_time')
    return isNaN(Date.parse(epire_time))|| Date.parse(epire_time)<=Date.now()
  } 

  const setAdminStatus =  (input) => {
    let role = 'normal';
    if(input) role ='admin'
    localStorage.setItem('userRole', role)
  }

  const isAdminPerson = () => {
    return localStorage.getItem('userRole') ==='admin'
  }

  const removeAdminStatus = () => {
    localStorage.removeItem('userRole')
  }




  const getPersonalUserData =  () => {
    // console.log('getPersonalUserDataogin....')
    return user.value
  }

  const fetchPersonalUserData = async () => {
    errors.value = []
    errorMessage.value = null
    // console.log('fetchPersonalUserData....')
    
    if(user.value) return

    try{
      const res = await axios.get('/auth/user')
      user.value = res.data
      setAdminStatus(user.value.is_admin)
    }catch(err){
      if(err.response.data.message==='Unauthenticated.'){
        await logout()
      } 
      errors.value = err.response.data.errors
      errorMessage.value = err.response.data.message
      
    }
  }

  // 管理員才可call
  const fetchAllUserData = async () =>{
    errors.value = []
    errorMessage.value = null

    let allUserData = null;
    try{
      const res = await axios.get('/users')
      allUserData = res.data
    }catch(err){
      if(err.response.data.message==='Unauthenticated.'){
        await logout()
      }
      errors.value = err.response.data.errors
      errorMessage.value = err.response.data.message
      
    }
    return allUserData
  }

  // 管理員才可call
  const createUser = async (input) =>{
    errors.value = []
    errorMessage.value = null

    try{
      await axios.post('/users',input)
      useToast().success('Successfully create user');
    }catch(err){
      if(err.response.data.message==='Unauthenticated.'){
        await logout()
      }
      errors.value = err.response.data.errors
      errorMessage.value = err.response.data.message
      
    }

  }

  return { errors,errorMessage,login,logout, getPersonalUserData, fetchPersonalUserData, isCookieHasExpired, isAdminPerson }
})

