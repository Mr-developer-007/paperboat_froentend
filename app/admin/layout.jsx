"use client"
import React, { useEffect, useState } from 'react'
import Slider from './compo/Slider'
import axios from 'axios'
import { AdminUrl } from './compo/admin-utils'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
axios.defaults.withCredentials =true

const layout = ({children}) => {
const [loading,setLoading]=useState(true)
const route = useRouter()
const fetchAdmin = async()=>{
  try {
    const response = await axios.get(`${AdminUrl}/auth/admin`)
    const data = await response.data;
    
    if(data.success){
      setLoading(false)
    }else{
      toast.error(data.message)
      route.push("/login/admin")
    }
  } catch (error) {
          route.push("/login/admin")

  }
}

useEffect(()=>{
  fetchAdmin()
},[])

if(loading){
  return<div>
    loading.....
  </div>
}

  return (
    <div className='flex h-screen '>
      <div>
         <Slider />
      </div>
       
        <div className='w-full h-screen overflow-auto'>

      {children}
        </div>
    </div>
  )
}

export default layout
