"use client"
import { editor_url } from '@/components/utils'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from './compo/Slider'
import { usePathname } from 'next/navigation'

axios.defaults.withCredentials = true

const layout =  ({children}) => {

const urlpath =usePathname()



  return (
    <div>


<div className='h-screen w-screen flex'>

<div className='h-screen'>
  
<Slider  />

</div>
<div className='w-full h-screen overflow-y-scroll'>
  {children}
</div>

</div>
      

    </div>
  )
}

export default layout
