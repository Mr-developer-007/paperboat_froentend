"use client"

import FilterSection from '@/components/FilterSection'
import PaperSection from '@/components/PaperSection'
import React, { Suspense } from 'react'

const page = () => {





  return (
    <div className='flex'>
<Suspense fallback={<div>Loading.....</div>}>
<FilterSection />
</Suspense>

<Suspense fallback={<div>Loading.....</div>}>
<PaperSection />
</Suspense>
     
    </div>
  )
}

export default page
