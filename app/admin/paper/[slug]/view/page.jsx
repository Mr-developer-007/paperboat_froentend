import React from 'react'
import ViewCompo from './ViewCompo';

const page = async({params}) => {
    const {slug} = await params;
  return (
   <ViewCompo slug={slug} />
  )
}

export default page
