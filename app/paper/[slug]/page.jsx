import React from 'react'
import PaperCompo from './PaperCompo'
const page =  async({params}) => {
const {slug} = await params  


  return (
   

    <div>
<PaperCompo slug={slug} />
        
    </div>
  )
}

export default page
